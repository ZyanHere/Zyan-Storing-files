import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createFile = mutation({
    args: {
      name: v.string(),
      fileId: v.id("_storage"),
      orgId: v.string(),
    },
    async handler(ctx, args) {
      const identity = ctx.auth.getUserIdentity()

      if(!identity){
        throw new ConvexError("User is not logged in")
      }
  
      await ctx.db.insert("files", {
        name: args.name,
        orgId: args.orgId,
        fileId: args.fileId,
      });
    },
  });

  export const getFiles = query({
    args: {
      orgId: v.string(),
      query: v.optional(v.string()),
      favorites: v.optional(v.boolean()),
      deletedOnly: v.optional(v.boolean()),
    },
    async handler(ctx, args) {
        const identity = ctx.auth.getUserIdentity()

        if(!identity){
          return []
        }
  
      return ctx.db.query('files').collect()
    },
  });
  