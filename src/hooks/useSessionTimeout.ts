// hooks/useSessionTimeout.ts
import { useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '../features/auth/store';

interface UseSessionTimeoutOptions {
  timeoutMinutes?: number;
  warningMinutes?: number;
  onWarning?: () => void;
  onTimeout?: () => void;
}

export const useSessionTimeout = ({
  timeoutMinutes = 30,
  warningMinutes = 5,
  onWarning,
  onTimeout
}: UseSessionTimeoutOptions = {}) => {
  const { user, logout } = useAuthStore();
  const warningShownRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const warningRef = useRef<number | null>(null);

  const resetTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
      warningRef.current = null;
    }
    warningShownRef.current = false;
  }, []);

  const handleTimeout = useCallback(() => {
    resetTimers();
    if (onTimeout) {
      onTimeout();
    } else {
      // Default timeout behavior with friendly message
      alert('Phiên đăng nhập đã hết hạn để đảm bảo an toàn.\n\nVui lòng đăng nhập lại.');
      logout();
    }
  }, [onTimeout, logout, resetTimers]);

  const startTimers = useCallback(() => {
    if (!user) return;

    resetTimers();

    const timeoutMs = timeoutMinutes * 60 * 1000;
    const warningMs = (timeoutMinutes - warningMinutes) * 60 * 1000;

    // Set warning timer
    warningRef.current = window.setTimeout(() => {
      if (!warningShownRef.current) {
        warningShownRef.current = true;
        if (onWarning) {
          onWarning();
        } else {
          // Default warning behavior
          const shouldContinue = window.confirm(
            `Phiên đăng nhập sẽ hết hạn trong ${warningMinutes} phút nữa.\n\nBạn có muốn tiếp tục sử dụng không?`
          );
          if (shouldContinue) {
            startTimers(); // Reset timers
          } else {
            handleTimeout();
          }
        }
      }
    }, warningMs);

    // Set timeout timer
    timeoutRef.current = window.setTimeout(() => {
      handleTimeout();
    }, timeoutMs);
  }, [user, timeoutMinutes, warningMinutes, onWarning, handleTimeout, resetTimers]);

  const extendSession = useCallback(() => {
    startTimers();
  }, [startTimers]);

  useEffect(() => {
    if (user) {
      startTimers();
    } else {
      resetTimers();
    }

    // Activity listeners to reset timer on user interaction
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const resetTimer = () => {
      if (user && !warningShownRef.current) {
        startTimers();
      }
    };

    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    return () => {
      resetTimers();
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
    };
  }, [user, startTimers, resetTimers]);

  return {
    extendSession,
    resetTimers
  };
};
