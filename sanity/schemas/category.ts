import { Rule } from "sanity";

export const category = {
    name: "category",
    title: "Category",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule: Rule) => Rule.required().error("Name is required"),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 60,
            },
        },
    ],
};