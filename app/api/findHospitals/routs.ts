import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { lat, long } = await req.json();
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!lat || !long) {
    return NextResponse.json({ error: 'Location is required' }, { status: 400 });
  }
  if (!apiKey) {
    return NextResponse.json({ error: 'Maps API key is not configured' }, { status: 500 });
  }

  // Google Maps Places API endpoint
  const url = `https://places.googleapis.com/v1/places:searchNearby`;

  const requestBody = {
    // We search for 'hospital'
    includedTypes: ["hospital"],
    // Max 10 results
    maxResultCount: 10,
    // The user's location, in a 5km radius
    locationRestriction: {
      circle: {
        center: {
          latitude: lat,
          longitude: long,
        },
        radius: 5000.0, // 5km
      },
    },
  };

  try {
    const mapsResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        // This specifies which fields we want back (to save money)
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.nationalPhoneNumber',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await mapsResponse.json();

    if (!mapsResponse.ok || !data.places) {
      console.error("Google Maps API Error:", data.error);
      return NextResponse.json({ error: 'Failed to find hospitals' }, { status: 500 });
    }

    // Format the results to be simple
    const places = data.places.map((place: any) => ({
      name: place.displayName?.text || 'No name',
      address: place.formattedAddress || 'No address',
      phone: place.nationalPhoneNumber || null,
    }));

    return NextResponse.json({ places });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
