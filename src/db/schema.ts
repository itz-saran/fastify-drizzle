import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("text").notNull(),
	email: text("email").unique().notNull(),
});

export const posts = pgTable("posts", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: text("text").notNull(),
	content: text("content").notNull(),
	author_id: uuid("author_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	created_at: timestamp("created_at").defaultNow().notNull(),
	updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const comments = pgTable("comments", {
	id: uuid("id").defaultRandom().primaryKey(),
	content: text("content").notNull(),
	author_id: uuid("author_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	post_id: uuid("post_id")
		.notNull()
		.references(() => posts.id, { onDelete: "cascade" }),
	created_at: timestamp("created_at").defaultNow().notNull(),
	updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
	//one user has many posts and comments
	posts: many(posts),
	comments: many(comments),
}));

export const postRelations = relations(posts, ({ one, many }) => ({
	//one post has many comments
	comments: many(comments),

	// many post to one author
	author: one(users, {
		fields: [posts.author_id],
		references: [users.id],
	}),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
	//many comments to one post
	post: one(posts, {
		fields: [comments.post_id],
		references: [posts.id],
	}),

	// many post to one author (users)
	author: one(users, {
		fields: [comments.author_id],
		references: [users.id],
	}),
}));
