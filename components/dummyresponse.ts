export const binaryTreeNotes = [
  {
    title: 'Properties of Binary Trees',
    content:
      'Understanding structure, characteristics, and key relationships in binary trees.',
  },
  {
    title: "Maximum Nodes at Level 'l'",
    content: [
      'A binary tree can have at most 2^l nodes at level l.',
      'Level Definition: The number of edges in the path from the root to a node. The root is at level 0.',
      'Proof by Induction: Base case and inductive step explained.',
      'Proof by Induction: Base case and inductive step explained.',
      'Proof by Induction: Base case and inductive step explained.',
      'Proof by Induction: Base case and inductive step explained.',
    ],
  },
  {
    title: "Maximum Nodes in a Binary Tree of Height 'h'",
    content: [
      'A binary tree of height h can have at most 2^(h+1) - 1 nodes.',
      'Height Definition: The longest path from the root to a leaf node.',
      'Formula Derivation: Summing nodes at each level.',
      'Alternate Height Convention noted.',
    ],
  },
  {
    title: "Minimum Height for 'N' Nodes",
    content: [
      'The minimum possible height for N nodes is ⌊log₂(N)⌋.',
      'Explanation: A binary tree with height h can have at most 2^(h+1) - 1 nodes.',
      'Rearranging the formula to derive the minimum height.',
    ],
  },
  {
    title: "Minimum Levels for 'L' Leaves",
    content: [
      'A binary tree with L leaves must have at least ⌊log₂(L)⌋ levels.',
      'Explanation: A tree has the maximum number of leaves when all levels are fully filled.',
      'Deriving the minimum levels needed to accommodate L leaves.',
    ],
  },
  {
    title: 'Nodes with Two Children vs. Leaf Nodes',
    content: [
      'In a full binary tree, the number of leaf nodes (L) is always one more than the internal nodes (T) with two children: L = T + 1.',
      'Proof: A full binary tree has a total of 2^(h+1) - 1 nodes.',
      'Leaves are at the last level. Internal nodes calculation.',
    ],
  },
  {
    title: 'Total Edges in a Binary Tree',
    content: [
      'In any non-empty binary tree with n nodes, the total number of edges is n - 1.',
      'Every node (except the root) has exactly one parent.',
      'Each parent-child connection represents an edge.',
    ],
  },
  {
    title: 'Node Relationships',
    content: [
      'Each node has at most two children.',
      '0 children → Leaf Node',
      '1 child → Unary Node',
      '2 children → Binary Node',
    ],
  },
  {
    title: 'Types of Binary Trees',
    content: [
      'Full Binary Tree: Every non - leaf node has exactly two children.',
      'Complete Binary Tree: All levels are fully filled except possibly the last, which is filled from left to right.',
      'Perfect Binary Tree: Every level is completely filled, and all leaves are at the same depth.',
      'Balanced Binary Tree: The left and right subtrees differ in height by at most 1.',
    ],
  },
  {
    title: 'Tree Traversal Methods',
    content: [
      'Tree traversal is categorized into Depth-First Search (DFS) and Breadth-First Search (BFS).',
      'DFS Traversals: In-Order (LNR), Pre-Order (NLR), Post-Order (LRN).',
      'BFS Traversals: Level-Order, Zig-Zag Traversal.',
    ],
  },
];
