const helper = require("./helper")
const blogs =
[
  {
    title: "Blog-title",
    author: "Mongoose",
    url: "undefined",
    user: {
      username: "Erik",
      id: "6203807c6aa338328772bdb3"
    },
    likes: 29,
    id: "6203a2e8e1c5c93ecaf7dffd"
  },
  {
    title: "Blog-title",
    author: "Mongoose",
    url: "undefined",
    user: {
      username: "Erik",
      id: "6203807c6aa338328772bdb3"
    },
    likes: 558,
    id: "6203da98734ba98eb8c94bd5"
  },
  {
    title: "Blog-title",
    author: "Mongoose",
    url: "undefined",
    user: {
      username: "Erik",
      id: "6203807c6aa338328772bdb3"
    },
    likes: 556,
    id: "6203db7325964e916adb54c7"
  },
  {
    title: "Blog-title",
    author: "Mongoose",
    url: "undefined",
    user: {
      username: "Erik",
      id: "6203807c6aa338328772bdb3"
    },
    likes: 556,
    id: "6203dbb950639f0c7cb26ed3"
  },
  {
    title: "Blog-title",
    author: "Mongoose",
    url: "undefined",
    user: {
      username: "Erik",
      id: "6203807c6aa338328772bdb3"
    },
    likes: 556,
    id: "6203dbf350639f0c7cb26ed8"
  },
  {
    title: "Blog-title",
    author: "Mongoose",
    url: "undefined",
    user: {
      username: "Erik",
      id: "6203807c6aa338328772bdb3"
    },
    likes: 556,
    id: "6203dc607ec70c5e6ed6e1df"
  },
  {
    title: "Blog-title",
    author: "Mongoose",
    url: "undefined",
    user: {
      username: "Erik",
      id: "6203807c6aa338328772bdb3"
    },
    likes: 571,
    id: "6203dceaf9ba192fa24b215a"
  },
  {
    title: "Blog-title",
    author: "Mongoose",
    url: "undefined",
    user: {
      username: "Erik",
      id: "6203807c6aa338328772bdb3"
    },
    likes: 563,
    id: "6204ca9fa0e6b3d6b209aaef"
  },
  {
    title: "Blog-title",
    author: "Mongoose",
    url: "undefined",
    user: {
      username: "Erik",
      id: "6203807c6aa338328772bdb3"
    },
    likes: 556,
    id: "6204caaaa0e6b3d6b209aaf3"
  },
  {
    title: "Testi",
    author: "Minä",
    url: "google.com",
    likes: 4,
    user: {
      username: "Erik käyttäjä",
      name: "Erik",
      id: "6514df87837e8969d670e867"
    },
    id: "653e1ff8cfb38f71d6963f6b"
  },
  {
    title: "testi",
    author: "Erik",
    url: "google.com",
    likes: 7,
    user: {
      username: "Erik käyttäjä",
      name: "Erik",
      id: "6514df87837e8969d670e867"
    },
    id: "654504df23496a66d0eebfcb"
  },
  {
    title: "joku",
    author: "joku",
    url: "joku",
    likes: 9,
    user: {
      username: "Erik käyttäjä2",
      name: "Erik",
      id: "653e1ec2cfb38f71d6963f5a"
    },
    id: "654907637f06de2dfbd322b8"
  }
]

test('returns data as wanted', () => {
  //console.log(blogs)
  const list = helper.userWithBlogs(blogs, "6203807c6aa338328772bdb3")
  console.log(list)
  })
