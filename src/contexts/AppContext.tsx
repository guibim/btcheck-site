import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "pt-BR" | "en";
type Theme = "light" | "dark";

interface AppContextType {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = {
  "pt-BR": {
    header_title: "btcheck",
    header_subtitle: "Seu Check ✓ no Bitcoin Diário",
    hero_title: "btcheck · Notícias e Cotação",
    hero_title_highlight: "Bitcoin",
    hero_subtitle: "Notícias dos melhores feeds todos os dias às 12h · Cotações atualizadas a cada 10 minutos · Foco total no mercado cripto",
    tab_quote_news: "Cotação & Notícias",
    tab_support: "⚡ Apoie o Projeto",
    quote_title: "Cotação",
    quote_update: "Atualizar",
    quote_updating: "Atualizando…",
    quote_error: "Erro:",
    quote_updated: "Atualizado em",
    quote_usd: "USD",
    quote_brl: "BRL",
    quote_no_brl: "Sem valor BRL disponível",
    quote_loading: "Carregando USD…",
    converter_title: "Conversor BTC para Dólar e Real",
    converter_update: "Atualizar",
    converter_updating: "Atualizando…",
    converter_offline: "Offline (cache)",
    converter_loading: "Carregando preços…",
    converter_error: "Falha ao carregar:",
    converter_updated: "Atualizado em",
    converter_value: "Valor",
    converter_direction: "Direção",
    converter_hint_btc: "Quantidade de bitcoin",
    converter_hint_brl: "Valor em reais",
    converter_hint_usd: "Valor em dólares",
    converter_warning_limit: "Valor ultrapassou o limite permitido",
    converter_warning_clamp: "Valor foi ajustado ao limite",
    news_title: "Últimas Notícias",
    support_title: "⚡ Apoie o Projeto",
    support_subtitle: "Ajude a manter o btcheck funcionando",
    support_lightning: "Lightning Network",
    support_onchain: "On-chain (Bitcoin)",
    footer_text: "Agregador de notícias Bitcoin · Desenvolvido por guibim",
    newsletter_button: "Newsletter",
    newsletter_title: "Assine a nossa newsletter",
    newsletter_description: "Receba um resumo com as principais notícias sobre Bitcoin da semana diretamente no seu e-mail.",
    newsletter_schedule_prefix: "A newsletter é enviada toda",
    newsletter_schedule_highlight: "sexta-feira às 12h",
    newsletter_coming_soon: "Em breve você poderá se inscrever aqui.",
    history_button: "Histórico de Cotações",
    history_title: "Histórico de Cotações",
    history_description: "Aqui você poderá consultar os preços históricos do Bitcoin em USD com dados da Binance.",
    history_coming_soon: "Este será o local onde o backend (ainda em desenvolvimento) consumirá a API da Binance para exibir os dados históricos.",
    fear_greed_button: "Índice Fear & Greed",
    fear_greed_title: "Fear & Greed Index",
    fear_greed_index_coming: "Índice será exibido aqui em breve",
    fear_greed_chart: "Gráfico",
    fear_greed_chart_coming: "📈 Gráfico do índice será exibido aqui em breve.",
    fear_greed_history: "Histórico",
    fear_greed_history_coming: "Histórico do índice será exibido aqui em breve.",
  },
  "en": {
    header_title: "btcheck",
    header_subtitle: "Your Daily Bitcoin Check ✓",
    hero_title: "btcheck · News & Quotes",
    hero_title_highlight: "Bitcoin",
    hero_subtitle: "News from the best feeds every day at 12pm · Quotes updated every 10 minutes · Full focus on crypto market",
    tab_quote_news: "Quotes & News",
    tab_support: "⚡ Support Project",
    quote_title: "Quote",
    quote_update: "Update",
    quote_updating: "Updating…",
    quote_error: "Error:",
    quote_updated: "Updated at",
    quote_usd: "USD",
    quote_brl: "BRL",
    quote_no_brl: "No BRL value available",
    quote_loading: "Loading USD…",
    converter_title: "BTC to Dollar and Real Converter",
    converter_update: "Update",
    converter_updating: "Updating…",
    converter_offline: "Offline (cache)",
    converter_loading: "Loading prices…",
    converter_error: "Failed to load:",
    converter_updated: "Updated at",
    converter_value: "Value",
    converter_direction: "Direction",
    converter_hint_btc: "Bitcoin amount",
    converter_hint_brl: "Value in reais",
    converter_hint_usd: "Value in dollars",
    converter_warning_limit: "Value exceeded allowed limit",
    converter_warning_clamp: "Value was adjusted to limit",
    news_title: "Latest News",
    support_title: "⚡ Support Project",
    support_subtitle: "Help keep btcheck running",
    support_lightning: "Lightning Network",
    support_onchain: "On-chain (Bitcoin)",
    footer_text: "Bitcoin news aggregator · Developed by guibim",
    newsletter_button: "Newsletter",
    newsletter_title: "Subscribe to our newsletter",
    newsletter_description: "Receive a weekly summary of the main Bitcoin news directly in your email.",
    newsletter_schedule_prefix: "The newsletter is sent every",
    newsletter_schedule_highlight: "Friday at 12pm",
    newsletter_coming_soon: "Soon you will be able to subscribe here.",
    history_button: "Price History",
    history_title: "Price History",
    history_description: "Here you can check Bitcoin historical prices in USD with Binance data.",
    history_coming_soon: "This will be where the backend (still in development) will consume the Binance API to display historical data.",
    fear_greed_button: "Fear & Greed Index",
    fear_greed_title: "Fear & Greed Index",
    fear_greed_index_coming: "Index will be displayed here soon",
    fear_greed_chart: "Chart",
    fear_greed_chart_coming: "📈 Index chart will be displayed here soon.",
    fear_greed_history: "History",
    fear_greed_history_coming: "Index history will be displayed here soon.",
  },
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("btcheck-language");
    return (saved === "en" || saved === "pt-BR") ? saved : "pt-BR";
  });
  
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("btcheck-theme");
    return (saved === "light" || saved === "dark") ? saved : "dark";
  });

  useEffect(() => {
    localStorage.setItem("btcheck-language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("btcheck-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["pt-BR"]] || key;
  };

  return (
    <AppContext.Provider value={{ language, theme, setLanguage, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
