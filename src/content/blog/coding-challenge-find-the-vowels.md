---
title: "Coding Challenge, find the vowels"
pubDate: 2023-09-04
description: "coding challenge"
author: "Pike"
tags: ["coding challenge", "blog"]
slug: find-the-vowels-coding-challenge
---  

# Coding Challenge, find the vowels!

## The challenge
Write a function where, when given a string, it returns an integer of all the vowels in the string.

## My Approach

So, it's kinda weird to be writing a blog post about such a simple task, but I felt like maybe it would be good to start documenting my coding and other such things. Anyway, this task is remarkably easy (imo) in JavaScript due to string manipulation.

First, lets write some tests (and I know at the time I am writing this, I have no CSS):

```javascript
test('Count Vowels', () => {
	expect(countVowels("Hello World")).toBe(3)
    expect(countVowels("")).toBe(0)
    expect(countVowels("HELLO WORLD")).toBe(3)
    expect(countVowels("hèllô")).toBe(0) // we're just dealing with 26 letter alphabet
    expect(countVowels(1)).toBe(0)
    expect(countVowels("10101032092309")).toBe(0)
});
```

Okay, so got an empty string, got some characters not in the alphabet, got some caps, got some numbers... this covers a good amount of the cases!

Now let's turn this puppy green! I'm going to just write some lazy code using basically just chaining a bunch of standard library together:

```javascript
const vowels = "aeiou".split("")
const countVowels = (input) => {
    if (typeof input !== "string") return 0
    return input.toLowerCase().split("").filter(char => vowels.includes(char)).length
}
```

Yeah I could have set vowels to an array, but, why not? I'm using a `split()` in the actual function. Everything is green, but I'm a little concerned about `toLocaleLowerCase` vs `toLowerCase` MDN says this is only a thing if you are trying to convert a string whose locale does not have typical unicode mappings... so no worries here. I suppose I could modify this for anything, numbers, Japanese characters etc. I wonder if Regexp would work better... less loops I suppose.

