/**
 * Formats a date string into a readable format (e.g., "January 2023")
 * @param dateString - Date string to format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Truncates text to a specified length and adds ellipsis if needed
 * @param text - Text to truncate
 * @param length - Maximum length before truncation
 * @returns Truncated text
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
}

/**
 * Generates a gradient style object based on color stops
 * @param colors - Array of color stops
 * @param angle - Gradient angle in degrees
 * @returns CSS gradient string
 */
export function generateGradient(
  colors: string[],
  angle: number = 135
): string {
  return `linear-gradient(${angle}deg, ${colors.join(", ")})`;
}

/**
 * Debounces a function to limit how often it's called
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Converts a string to kebab-case
 * @param str - String to convert
 * @returns kebab-case string
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/**
 * Generates a random ID
 * @param length - Length of the ID
 * @returns Random ID string
 */
export function generateId(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Smooth scrolls to an element on the page
 * @param id - ID of the element to scroll to
 * @param offset - Optional offset from the top
 */
export function scrollToElement(id: string, offset: number = 0): void {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  }
}

/**
 * Copies text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when text is copied
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}

/**
 * Formats a number with commas (e.g., 1000 → "1,000")
 * @param num - Number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

/**
 * Checks if the current device is mobile
 * @returns boolean indicating if device is mobile
 */
export function isMobileDevice(): boolean {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Capitalizes the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Gets the current theme (light/dark) based on localStorage or system preference
 * @returns 'light' or 'dark'
 */
export function getCurrentTheme(): "light" | "dark" {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme as "light" | "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "dark"; // Default to dark if window is undefined (SSR)
}

/**
 * Formats a duration in milliseconds to a human-readable format
 * @param ms - Duration in milliseconds
 * @returns Formatted string (e.g., "1.5s", "200ms")
 */
export function formatDuration(ms: number): string {
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(1)}s`;
  }
  return `${ms}ms`;
}

/**
 * Creates a promise that resolves after a specified delay
 * @param ms - Delay in milliseconds
 * @returns Promise that resolves after delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Filters an array of objects by a search term
 * @param array - Array to filter
 * @param searchTerm - Term to search for
 * @param keys - Keys to search in
 * @returns Filtered array
 */
export function filterBySearch<T>(
  array: T[],
  searchTerm: string,
  keys: Array<keyof T>
): T[] {
  if (!searchTerm) return array;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return array.filter((item) =>
    keys.some((key) =>
      String(item[key]).toLowerCase().includes(lowerSearchTerm)
    )
  );
}
