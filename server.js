const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./news.proto";
const protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let data = [
  {
    id: "1",
    title: "Title 1",
    body: "Body Content 1",
    image: "Image URL 1",
  },
  {
    id: "2",
    title: "Title 2",
    body: "Body Content 2",
    image: "Image URL 2",
  },
];

const getAllNews = (call, callback) => {
  callback(null, { news: data });
};

const getNews = (call, callback) => {
  const newsId = call.request.id;
  const newsItem = data.find(({ id }) => newsId == id);
  callback(null, newsItem);
};

const addNews = (call, callback) => {
  const news = { ...call.request };
  news.id = data.length + 1;
  data.push(news);
  callback(null, news);
};

const updateNews = (call, callback) => {
  const { id: newsId, title, body, image } = call.request;
  const newsItem = data.find(({ id }) => newsId == id);
  newsItem.title = title;
  newsItem.body = body;
  newsItem.image = image;
  callback(null, newsItem);
};

const deleteNews = (call, callback) => {
  const newsId = call.request.id;
  const index = data.findIndex((news) => {
    return news.id == newsId;
  });
  data.pop(index);
  callback(null, { id: newsId });
};

server.addService(newsProto.NewsService.service, {
  getAllNews,
  getNews,
  addNews,
  updateNews,
  deleteNews,
});

server.bindAsync(
  "localhost:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://localhost:50051");
    server.start();
  }
);
