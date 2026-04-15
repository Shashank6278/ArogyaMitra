import mongoose from "mongoose";

const buildMongoUri = ({ baseUri, dbName }) => {
    const uri = (baseUri || "").trim();
    if (!uri) throw new Error("Missing MONGODB_URI in backend/.env");

    const [beforeQuery, query = ""] = uri.split("?");
    const schemeSep = beforeQuery.indexOf("://");
    const afterScheme = schemeSep === -1 ? beforeQuery : beforeQuery.slice(schemeSep + 3);

    // Find the first "/" after the host section. If there's no path (or it's just "/"),
    // we append the dbName. If a db path already exists, keep it as-is.
    const firstSlash = afterScheme.indexOf("/");
    const hasDbPath = firstSlash !== -1 && afterScheme.slice(firstSlash + 1).length > 0;

    if (hasDbPath) return uri;

    const normalizedBeforeQuery = beforeQuery.replace(/\/+$/, "");
    const withDb = `${normalizedBeforeQuery}/${encodeURIComponent(dbName)}`;
    return query ? `${withDb}?${query}` : withDb;
};

const connectDB = async () => {

    const dbName = (process.env.MONGODB_DB || "ArogyaMitra").trim();
    const mongoUri = buildMongoUri({ baseUri: process.env.MONGODB_URI, dbName });

    mongoose.connection.on("connected", () => console.log("Database Connected"));
    mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err?.message || err));

    await mongoose.connect(mongoUri);

}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.
