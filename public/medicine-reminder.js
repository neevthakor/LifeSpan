
class MedicineReminder {
  constructor() {
    this.reminders = [];
    this.checkInterval = null;
    this.init();
  }

  // Initialize the reminder system
  async init() {
    console.log('🚀 Medicine Reminder System Starting...');
    
    // Request notification permission
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        console.log('📢 Notification permission:', permission);
      }
    } else {
      console.warn('⚠️ Browser does not support notifications');
    }

    // Register Service Worker for background notifications
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('✅ Service Worker registered successfully');
      } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
      }
    }

    // Load saved reminders from localStorage
    this.loadReminders();
    
    // Start checking for due reminders every minute
    this.startChecking();
  }

  // Add a new medicine reminder
  addReminder(medicineName, times, duration, startDate = new Date()) {
    const reminder = {
      id: Date.now().toString(),
      medicineName: medicineName,
      times: times, // Array like ["09:00", "14:00", "21:00"]
      duration: duration, // Number of days
      startDate: startDate.toISOString(),
      endDate: new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000).toISOString(),
      active: true,
      createdAt: new Date().toISOString()
    };

    this.reminders.push(reminder);
    this.saveReminders();
    console.log('✅ Reminder added:', reminder);
    return reminder;
  }

  // Load reminders from localStorage
  loadReminders() {
    try {
      const saved = localStorage.getItem('medicineReminders');
      if (saved) {
        this.reminders = JSON.parse(saved);
        // Remove expired reminders
        const now = new Date();
        this.reminders = this.reminders.filter(r => new Date(r.endDate) > now);
        this.saveReminders();
        console.log(`📦 Loaded ${this.reminders.length} active reminders`);
      }
    } catch (error) {
      console.error('❌ Error loading reminders:', error);
      this.reminders = [];
    }
  }

  // Save reminders to localStorage
  saveReminders() {
    try {
      localStorage.setItem('medicineReminders', JSON.stringify(this.reminders));
      console.log('💾 Reminders saved');
    } catch (error) {
      console.error('❌ Error saving reminders:', error);
    }
  }

  // Check if any reminders are due
  checkReminders() {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const currentDate = now.toDateString();

    console.log(`⏰ Checking reminders at ${currentTime}...`);

    this.reminders.forEach(reminder => {
      if (!reminder.active) return;
      
      const endDate = new Date(reminder.endDate);
      if (now > endDate) {
        reminder.active = false;
        console.log(`⏹️ Reminder expired: ${reminder.medicineName}`);
        return;
      }

      // Check if current time matches any reminder time
      reminder.times.forEach(time => {
        const lastNotifiedKey = `lastNotified_${reminder.id}_${time}`;
        const lastNotified = localStorage.getItem(lastNotifiedKey);
        
        // Only notify once per time slot per day
        if (time === currentTime && lastNotified !== currentDate) {
          console.log(`🔔 Sending notification for: ${reminder.medicineName}`);
          this.sendNotification(reminder);
          localStorage.setItem(lastNotifiedKey, currentDate);
        }
      });
    });

    this.saveReminders();
  }

  // Send browser notification
  sendNotification(reminder) {
    const title = '💊 Medicine Reminder';
    const options = {
      body: `Time to take: ${reminder.medicineName}`,
      icon: '/placeholder-logo.png', // Uses your existing logo
      badge: '/placeholder-logo.png',
      vibrate: [200, 100, 200],
      tag: reminder.id,
      requireInteraction: true,
      actions: [
        { action: 'taken', title: '✓ Taken' },
        { action: 'snooze', title: '⏰ Snooze 10min' }
      ],
      data: {
        reminderId: reminder.id,
        medicineName: reminder.medicineName
      }
    };

    // Show notification
    if (Notification.permission === 'granted') {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        // Use service worker for persistent notifications
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(title, options);
        });
      } else {
        // Fallback to regular notification
        const notification = new Notification(title, options);
        
        notification.onclick = function() {
          window.focus();
          notification.close();
        };
      }

      // Play notification sound
      this.playNotificationSound();
      
      console.log('✅ Notification sent for:', reminder.medicineName);
    } else {
      console.warn('⚠️ Notification permission not granted');
    }
  }

  // Play notification sound
  playNotificationSound() {
    try {
      // Simple beep sound (base64 encoded)
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizYIF2m98OShUhELTqXh8bllHAU2j9r0yoIuBSV+zPLaizsIFGS56+mjUxEMUKjm8rVrIQU6+LO8t2IcBzuc/LPqgS0FKX7N8tmLOQgVZ7rs56JUEgxPpuLxsWgdBTuS2PLI');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Sound play failed (browser restriction):', e));
    } catch (error) {
      console.log('Could not play sound:', error);
    }
  }

  // Start checking for reminders
  startChecking() {
    // Check every minute
    this.checkInterval = setInterval(() => {
      this.checkReminders();
    }, 60000); // 60000ms = 1 minute

    // Also check immediately
    this.checkReminders();
    
    console.log('✅ Started checking reminders every minute');
  }

  // Stop checking
  stopChecking() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      console.log('⏹️ Stopped checking reminders');
    }
  }

  // Delete a reminder
  deleteReminder(id) {
    const reminder = this.reminders.find(r => r.id === id);
    if (reminder) {
      console.log('🗑️ Deleting reminder:', reminder.medicineName);
    }
    this.reminders = this.reminders.filter(r => r.id !== id);
    this.saveReminders();
  }

  // Get all active reminders
  getActiveReminders() {
    const now = new Date();
    return this.reminders.filter(r => r.active && new Date(r.endDate) > now);
  }

  // Update a reminder
  updateReminder(id, updates) {
    const reminder = this.reminders.find(r => r.id === id);
    if (reminder) {
      Object.assign(reminder, updates);
      this.saveReminders();
      console.log('✏️ Reminder updated:', reminder.medicineName);
    }
  }

  // Get reminder statistics
  getStats() {
    const active = this.reminders.filter(r => r.active).length;
    const total = this.reminders.length;
    const expired = total - active;
    
    return {
      activeReminders: active,
      totalReminders: total,
      expiredReminders: expired
    };
  }
}

// Create global instance that works everywhere
if (typeof window !== 'undefined') {
  window.medicineReminder = new MedicineReminder();
  console.log('🎉 Medicine Reminder System Ready!');
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MedicineReminder;
}