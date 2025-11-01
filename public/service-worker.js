// service-worker.js
// Background notification support - Place in public/ folder

const CACHE_NAME = 'medicine-reminder-v1';

// Install event - setup
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Installing...');
  self.skipWaiting(); // Activate immediately
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('✅ Service Worker: Activated');
  event.waitUntil(
    clients.claim().then(() => {
      console.log('👍 Service Worker: Claimed clients');
    })
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('🖱️ Notification clicked:', event.action);
  
  const notification = event.notification;
  const action = event.action;

  // Close the notification
  notification.close();

  if (action === 'taken') {
    // Medicine marked as taken
    console.log('✅ User marked medicine as taken');
    
    // Send message to all clients (open tabs)
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        clientList.forEach(client => {
          client.postMessage({
            type: 'MEDICINE_TAKEN',
            reminderId: notification.data?.reminderId,
            medicineName: notification.data?.medicineName
          });
        });
      })
    );
    
  } else if (action === 'snooze') {
    // Snooze for 10 minutes
    console.log('⏰ User snoozed reminder for 10 minutes');
    
    // Show snooze confirmation
    event.waitUntil(
      self.registration.showNotification('💊 Medicine Reminder - Snoozed', {
        body: 'You will be reminded again in 10 minutes',
        icon: '/placeholder-logo.png',
        badge: '/placeholder-logo.png',
        tag: notification.tag + '_snooze',
        requireInteraction: false,
        vibrate: [100]
      }).then(() => {
        // Schedule another notification in 10 minutes
        // Note: This is a simple implementation
        // For production, you'd want to use the Notifications API with precise timing
        setTimeout(() => {
          self.registration.showNotification('💊 Medicine Reminder - Snooze Ended', {
            body: `Time to take: ${notification.data?.medicineName || 'your medicine'}`,
            icon: '/placeholder-logo.png',
            badge: '/placeholder-logo.png',
            vibrate: [200, 100, 200],
            requireInteraction: true
          });
        }, 10 * 60 * 1000); // 10 minutes
      })
    );
    
  } else {
    // Default action - open the website
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
        // Check if there's already a window open
        for (let client of clientList) {
          if (client.url.includes('reminder-widget.html') && 'focus' in client) {
            return client.focus();
          }
        }
        
        // If no window is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow('/reminder-widget.html');
        }
      })
    );
  }
});

// Handle notification close
self.addEventListener('notificationclose', event => {
  console.log('🚫 Notification closed:', event.notification.tag);
  
  // Track that user dismissed the notification
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      clientList.forEach(client => {
        client.postMessage({
          type: 'NOTIFICATION_DISMISSED',
          reminderId: event.notification.data?.reminderId
        });
      });
    })
  );
});

// Handle push notifications (for future Firebase integration)
self.addEventListener('push', event => {
  console.log('📨 Push notification received');
  
  if (event.data) {
    try {
      const data = event.data.json();
      
      const options = {
        body: data.body || 'Time to take your medicine',
        icon: data.icon || '/placeholder-logo.png',
        badge: data.badge || '/placeholder-logo.png',
        vibrate: [200, 100, 200],
        data: data,
        requireInteraction: true,
        actions: [
          { action: 'taken', title: '✓ Taken' },
          { action: 'snooze', title: '⏰ Snooze 10min' }
        ]
      };

      event.waitUntil(
        self.registration.showNotification(data.title || '💊 Medicine Reminder', options)
      );
    } catch (error) {
      console.error('❌ Error processing push notification:', error);
    }
  }
});

// Handle messages from clients (web pages)
self.addEventListener('message', event => {
  console.log('📬 Message received in Service Worker:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Send acknowledgment back
  if (event.ports[0]) {
    event.ports[0].postMessage({ received: true });
  }
});

// Background sync (for offline support - future feature)
self.addEventListener('sync', event => {
  console.log('🔄 Background sync triggered:', event.tag);
  
  if (event.tag === 'sync-reminders') {
    event.waitUntil(
      // Sync reminders with server (implement when you add backend)
      Promise.resolve()
    );
  }
});

console.log('🚀 Service Worker loaded and ready!');