export default interface Post
  extends Pick<
    Queries.MarkdownRemarkFrontmatter,
    "title" | "desc" | "date" | "category" | "alt" | "tags"
  > {
  id: string
  slug: Queries.MarkdownRemarkFields["slug"]
  thumbnail?: string
}
