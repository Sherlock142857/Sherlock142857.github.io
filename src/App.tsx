import { useEffect } from "react";
import { HomeTransition } from "./components/home/HomeTransition";
import { getFieldById } from "./data/fields";
import { site } from "./data/site";
import { useHashRoute } from "./hooks/useHashRoute";
import { usePageTransition } from "./hooks/usePageTransition";
import { FieldPage } from "./pages/FieldPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  const [route, navigate] = useHashRoute();
  const { transition, enter, exit, clear, homeContentRef, homeImageRef, detailAnchorRef } =
    usePageTransition(navigate);

  const field = route.name === "field" ? getFieldById(route.fieldId) : undefined;

  useEffect(() => {
    if (route.name === "field" && !field) {
      navigate({ name: "home" });
      return;
    }
    document.title = field ? `${field.title} — ${site.name}` : site.meta.title;
  }, [route, field, navigate]);

  return (
    <>
      {route.name === "home" && (
        <HomePage homeContentRef={homeContentRef} homeImageRef={homeImageRef} onEnter={enter} />
      )}
      {route.name === "field" && field && (
        <FieldPage field={field} detailAnchorRef={detailAnchorRef} onExit={exit} />
      )}
      {transition && (
        <HomeTransition
          key={`${transition.direction}-${transition.fieldId}`}
          transition={transition}
          homeContentRef={homeContentRef}
          homeImageRef={homeImageRef}
          detailAnchorRef={detailAnchorRef}
          onNavigateToField={(fieldId) => navigate({ name: "field", fieldId })}
          onNavigateHome={() => navigate({ name: "home" })}
          onDone={clear}
        />
      )}
    </>
  );
}
