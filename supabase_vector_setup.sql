-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Create a table to store website content chunks and their embeddings
create table if not exists website_content (
  id bigserial primary key,
  content text not null,
  url_source text not null,
  embedding vector(384) -- 384 dimensions for all-MiniLM-L6-v2 model
);

-- Create an index for faster similarity searches (using HNSW)
create index if not exists website_content_embedding_idx on website_content using hnsw (embedding vector_cosine_ops);

-- Create a function to similarity search for relevant content chunks
create or replace function match_website_content (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  url_source text,
  similarity float
)
language sql stable
as $$
  select
    website_content.id,
    website_content.content,
    website_content.url_source,
    1 - (website_content.embedding <=> query_embedding) as similarity
  from website_content
  where 1 - (website_content.embedding <=> query_embedding) > match_threshold
  order by website_content.embedding <=> query_embedding
  limit match_count;
$$;
