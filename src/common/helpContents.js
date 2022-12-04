const helpContents = [
  {
    title: "達成日数とは",
    message:
      "このタスクを何回達成して記録したかの回数。継続が途切れても記録される。",
  },
  {
    title: "継続日数とは",
    message: "このタスクを連続して達成した日数",
  },
  {
    title: "継続週数とは",
    message:
      "このタスクを連続して達成した週の数。週に4日以上の達成でカウントされる。研究結果より、この継続週数が13以上(３ヶ月と少し)になれば習慣化できたと言える。",
  },
];

Object.freeze(helpContents);

export { helpContents };
