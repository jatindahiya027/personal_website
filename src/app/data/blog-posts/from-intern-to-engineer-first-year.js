const post = {
  slug:        "from-intern-to-engineer-first-year",
  title:       "From Intern to Engineer: Lessons From My First Year at TCS",
  excerpt:     "The things they don't teach you in college — navigating a large codebase, giving good code reviews, communicating up, and staying sane while learning everything at once.",
  date:        "2024-05-01",
  readTime:    "7 min read",
  tags:        ["Career", "Engineering", "Learning"],
  coverColor:  "linear-gradient(135deg, #2d1b69 0%, #6b3fa0 100%)",
  content: [
    { type: "p", text: "Joining TCS as a Systems Engineer in December 2023 was equal parts exciting and terrifying. I had four years of college projects and one internship behind me. What I found on the other side was a codebase with more lines than I'd read in my entire academic career, and teammates who'd been writing production code longer than I'd been seriously coding." },
    { type: "h2", text: "1. Reading Code Is a Skill" },
    { type: "p", text: "College teaches you to write code. Industry requires you to read it — and read it quickly, across files you've never seen, in patterns you haven't learned yet. The fix: I started reading production code that wasn't related to my tickets. Just browsing through modules, understanding how decisions connected." },
    { type: "h2", text: "2. Ask Questions, But Attempt First" },
    { type: "quote", text: "Come to me with questions. But come with an attempt, not a blank page." },
    { type: "p", text: "My tech lead said this in my first week and it changed how I asked for help. Before pinging someone, I now spend at least 20–30 minutes genuinely trying. I document what I tried, what I expected, and what I got." },
    { type: "h2", text: "3. Code Reviews Are Conversations, Not Judgements" },
    { type: "p", text: "My first code review was painful. Comments on every function. Changes requested. I wanted to defend every line. With time I learned that a thorough review is a gift — someone is spending their attention on your work to make it better." },
    { type: "h2", text: "4. Communication Is Underrated" },
    { type: "ul", items: [
      "Update your tickets before standup, not during",
      "If you're stuck for more than half a day, say something",
      "A PR description should be a one-paragraph story, not a diff summary",
      "Over-communicate when working remotely or across timezones",
    ]},
    { type: "h2", text: "5. Build Things on the Side" },
    { type: "p", text: "My side projects — Stag, MyCart, MoneyPot — are where I practise things I don't get to do at work. New frameworks, different architectures, risky design decisions. Work necessarily limits experimentation. Side projects are where your taste develops." },
    { type: "divider" },
    { type: "p", text: "A year in, I feel like I'm just starting to see the shape of what I don't know. That's probably a good sign." },
  ],
};

export default post;
