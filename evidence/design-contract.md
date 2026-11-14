# Bistro redesign

Purpose: German-speaking guests discover dishes, browse prices and prepare a WhatsApp pickup order.
Primary action: explore the menu, then add dishes. Restaurant information closes the page.
Direction (user-selected): warm, approachable Asian neighborhood bistro. Rice-paper ivory, clay-brown accents, natural rectangular food photographs and comfortably sized text. Headings support the dishes; gentle corners, warm surfaces and compact controls establish hospitality without theatrical frames.
Local observations: the former diagonal hero, repeated numbered decorations, dotted surfaces and long sequence before the menu compete with food and ordering. Use a composed split hero, four food previews, a short hospitality section, menu and visit information.
Viewports: 390x844 and 1440x900; additionally inspect 320px text fit.
States: local content loads without a blocking loader; empty search offers reset; empty cart offers browsing; selected dishes update the total; missing WhatsApp recipient is explained; no browser permissions are required. WhatsApp handoff is preparation, not proof of a delivered order.
Keep keyboard focus visible, respect reduced motion, avoid horizontal page overflow and retain the existing cart/search/filter workflows.

Menu usability refinement: desktop category sidebar with counts; native category selector on mobile; global dish/code search; selected-dishes filter; inline quantity controls synchronized with the WhatsApp cart. Keep control hit areas at least 40px, preserve keyboard focus through quantity updates, and show recoverable empty-search and empty-selection states. Retain the user-selected warm palette.

Palette refinement (user request: stronger color): chili red for prices and primary actions, deep leaf green for category selection and quantities, golden-cream toolbar and number badges, darker brown body text. Selected dishes receive an explicit red border/left accent and warm highlighted surface. Check foreground/background contrast at both target viewports.
