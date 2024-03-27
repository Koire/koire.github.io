---
title: "Coding Challenge, make a searchable Trie"
pubDate: 2023-09-21
description: "coding challenge"
author: "Pike"
tags: ["coding challenge", "blog", "d3js"]
slug: make-a-searchable-trie
---  

# Another Coding Challenge!

Found another nifty coding challenge about Trie, which is a prefix tree. Basically it's how autocomplete works by searching a tree based on the first characters of a word.

## Description

Implement a trie (prefix tree) with the following methods: 'insert', 'search', and 'startsWith'.

## Rules

- 'insert(word)': Inserts the string 'word' into the trie.
- 'search(word)': Returns true if the string 'word' is in the trie, or false otherwise.
- 'startsWith(prefix)': Returns true if there is any string in the trie that starts with the given prefix 'prefix', or false otherwise.

## Examples

- trie = new Trie();
- trie.insert('apple');
- trie.search('apple'); // returns true
- trie.search('app'); // returns false
- trie.startsWith('app'); // returns true

## Approach and notes

Alright, so I had to look up what a trie is, and I also wanted to, like usual, show it [visually](/demos/trie).

So, we have 2 challenges, figure out what a trie is [wikipedia](https://en.wikipedia.org/wiki/Trie) and map the tree on a page in html using canvas [BFS Canvas Tree](https://github.com/foqc/bfs-canvas-tree). Finding a graphing library that would just simply graph the tree onto the screen. D3 & Plot were too complicated and kept throwing errors even though I used the demo data.
