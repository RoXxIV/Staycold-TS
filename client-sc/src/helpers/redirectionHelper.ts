/**
 * @fileoverview Helper for redirection timer
 */
import { ref, onBeforeUnmount } from "vue";
import router from "@/router";

/**
 * @description redirect the user to the given path after the given time
 * @param redirectTo - Redirection path
 * @param timer - Timer in seconds
 * @returns Redirection timer
 */
export function useRedirectionTimer(redirectTo: string, timer: number = 5) {
  const time = ref(timer);
  let redirectionTimerId: number | NodeJS.Timeout;

  const startRedirectionTimer = () => {
    redirectionTimerId = setInterval(() => {
      time.value--;
      if (time.value === 0) {
        clearInterval(redirectionTimerId as number);
        router.push(redirectTo);
      }
    }, 1000);
  };

  onBeforeUnmount(() => {
    if (redirectionTimerId) clearInterval(redirectionTimerId);
  });

  return { time, startRedirectionTimer };
}
