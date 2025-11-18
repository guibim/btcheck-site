import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/contexts/AppContext";

const Newsletter = () => {
  const { t } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#f7931a" }}>
            📩 {t("newsletter_title")}
          </h1>
          
          <div 
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#e5e5e5" }}
          >
            <p className="mb-4">
              {t("newsletter_description")}
            </p>
            <p>
              {t("newsletter_schedule_prefix")} <strong>{t("newsletter_schedule_highlight")}</strong>.
            </p>
          </div>

          <div className="mt-12 p-8 rounded-lg border border-primary/30 bg-card/50">
            <p className="text-muted-foreground">
              {t("newsletter_coming_soon")}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Newsletter;
