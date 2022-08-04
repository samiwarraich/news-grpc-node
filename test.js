const client = require("./client");

client.getAllNews({}, (error, data) => {
  if (error) throw error;
  console.table(data.news);
  console.log("Successfully get all news");
});

client.getNews({ id: 1 }, (error, data) => {
  if (error) throw error;
  console.table(data);
  console.log(`Successfully got news with id :${data.id}`);
});

client.addNews(
  {
    title: "New Title",
    body: "New Body content",
    image: "New Image URL",
  },
  (error, data) => {
    if (error) throw error;
    console.table(data);
    console.log("Successfully created a news.");
  }
);

client.updateNews(
  {
    id: 3,
    title: "Updated Title",
    body: "Updated Body content",
    image: "Updated Image URL",
  },
  (error, data) => {
    if (error) throw error;
    console.table(data);
    console.log(`Successfully updated a news with id :${data.id}`);
  }
);

client.deleteNews(
  {
    id: 3,
  },
  (error, data) => {
    if (error) throw error;
    console.log(`Successfully deleted a news with id:${data.id}`);
  }
);
