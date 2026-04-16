const post = {
  slug:        "react-patterns-i-use-daily",
  title:       "Six React Patterns I Use in Every Project",
  excerpt:     "Beyond useState and useEffect — the compositional patterns, custom hooks, and component design principles that make React code actually maintainable.",
  date:        "2024-03-10",
  readTime:    "9 min read",
  tags:        ["React", "JavaScript", "Frontend", "Patterns"],
  coverColor:  "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
  content: [
    { type: "p", text: "I've rewritten the same React component patterns about a dozen times across different projects. Each rewrite teaches me something new about what 'maintainable' actually means in practice. Here are six patterns I now start with, not arrive at after a painful refactor." },
    { type: "h2", text: "1. Compound Components" },
    { type: "code", lang: "jsx", text: `// Monolithic (hard to customise)
<Modal title="Confirm" body="Are you sure?" onConfirm={fn} onCancel={fn} />

// Compound (flexible, readable)
<Modal>
  <Modal.Header>Confirm</Modal.Header>
  <Modal.Body>Are you sure?</Modal.Body>
  <Modal.Footer>
    <Button onClick={onCancel}>Cancel</Button>
    <Button variant="primary" onClick={onConfirm}>Yes</Button>
  </Modal.Footer>
</Modal>` },
    { type: "h2", text: "2. Custom Hooks for Behaviour, Components for UI" },
    { type: "code", lang: "jsx", text: `function useInfiniteScroll(loadMore) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore();
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [loadMore]);
  return ref;
}` },
    { type: "h2", text: "3. The Controlled Input Pattern" },
    { type: "p", text: "Uncontrolled inputs (using ref to read values) are fine for simple forms. But for any form with validation, interdependent fields, or submit logic, controlled inputs where React owns the state are far easier to reason about." },
    { type: "h2", text: "4. Error Boundaries for Resilient UIs" },
    { type: "p", text: "React error boundaries catch JavaScript errors in their child component tree and display a fallback UI. Without them, one unhandled error can blank out your entire page. I wrap every major page section in an error boundary." },
    { type: "h2", text: "5. Render Props for Cross-Cutting Concerns" },
    { type: "p", text: "When two completely different components need the same behaviour (e.g. tracking mouse position, measuring element size), a render prop or hook extracts it without forcing a shared parent." },
    { type: "h2", text: "6. Memoisation — Sparingly" },
    { type: "quote", text: "Premature optimisation is the root of all evil. This applies to React hooks too." },
    { type: "p", text: "Profile first. Memoise only when you measure a real performance problem, not as a precaution." },
    { type: "divider" },
    { type: "p", text: "These patterns aren't rules. They're starting points. The best code is the simplest code that solves the problem." },
  ],
};

export default post;
