import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { cn } from '../utils/cn'

/**
 * Sun/moon toggle button for switching dark/light mode.
 * @param {{ className?: string }} props
 */
const ThemeToggle = ({ className }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'flex items-center justify-center w-10 h-10 rounded-full',
        'border border-light-border dark:border-dark-border',
        'bg-light-card/50 dark:bg-dark-elevated/50',
        'text-gray-600 dark:text-ink-secondary',
        'hover:text-brand transition-colors duration-200',
        className
      )}
    >
      {isDark ? (
        <Sun size={18} strokeWidth={1.75} />
      ) : (
        <Moon size={18} strokeWidth={1.75} />
      )}
    </button>
  )
}

export default ThemeToggle
