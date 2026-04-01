import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';
// import { useToast } from '@/hooks/use-toast';

const options = [
  { value: 'light' as const, icon: Sun, label: 'Light' },
  { value: 'dark' as const, icon: Moon, label: 'Dark' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
//   const { toast } = useToast();

  return (
    <div className="flex items-center bg-muted rounded-xl p-1 gap-0.5">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => {
            setTheme(value);
            // toast({
            //   title: `Theme: ${label}`,
            //   description: `${label} mode enabled`,
            //   duration: 2000,
            // });
          }}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300',
            theme === value
              ? 'bg-card text-foreground shadow-card'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Icon size={14} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}