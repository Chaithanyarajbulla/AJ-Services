import { ThemeProvider } from "@/components/theme-provider";
import AJApp from "@/features/app/AJApp";
import "@/index.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen w-full flex justify-center bg-background">
        <div className="w-full max-w-[480px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto">
          <AJApp />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;