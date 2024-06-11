import { Rule, validation } from "sanity";

export const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Title is required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        validation: (Rule: Rule) => Rule.max(200).required().error('Excerpt is required, max 200 characters'),
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'tag' } }],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              title: "Position",
              name: "position",
              type: "string",
              options: {
                list: [
                  { title: "Center", value: "center" },
                  { title: "Left", value: "left" },
                  { title: "Right", value: "right" },
                ],
                layout: "radio",
                isHighlighted: true,
              },
            },
            {
              title: "Image",
              name: "image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
