<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator; // Add this line

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 5); // Default to 5 if not provided
            $posts = Post::with('user')->orderBy('created_at', 'desc')->paginate($perPage);
            $postsWithImagesAndUsers = $posts->getCollection()->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'quote' => $post->quote,
                    'user_name' => $post->user ? $post->user->first_name : 'Anonymous',
                    'image_url' => $post->image ? asset('images/' . $post->image) : null,
                    'is_commentable' => $post->is_commentable,
                    'created_at' => $post->created_at,
                ];
            });
            $posts->setCollection($postsWithImagesAndUsers);
            return $posts;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function getposts()
    {
        try {
            $posts = Post::with('user')->get();
            $postsWithImagesAndUsers = $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'quote' => $post->quote,
                    'user_name' => $post->user ? $post->user->first_name : 'Anonymous',
                    'image_url' => $post->image ? asset('images/' . $post->image) : null,
                    'is_commentable' => $post->is_commentable,
                    'created_at' => $post->created_at,
                ];
            });
            return response()->json(['posts' => $postsWithImagesAndUsers], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function adminPosts()
    {
        try {
            $posts = Post::with('user')->get();
            $postsWithImagesAndUsers = $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'quote' => $post->quote,
                    'user_name' => $post->user ? $post->user->first_name : 'Anonymous',
                    'image_url' => $post->image ? asset('images/' . $post->image) : null,
                    'is_commentable' => $post->is_commentable,
                    'created_at' => $post->created_at,
                ];
            });
            return $postsWithImagesAndUsers;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function getAllPosts()
    {
        \Log::info('getAllPosts function called');
        try {
            \Log::info('Fetching posts with user relationships');
            $posts = Post::with('user')->get();
            \Log::info('Posts fetched, count: ' . $posts->count());
            if ($posts->isEmpty()) {
                \Log::info('No posts found, returning empty response');
                return response()->json(['message' => 'No posts found'], 200);
            }
            \Log::info('Mapping posts to include images and user details');
            $postsWithImages = $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'quote' => $post->quote,
                    'user_name' => $post->user ? $post->user->first_name : 'Anonymous',
                    'image_url' => $post->image ? asset('images/' . $post->image) : null,
                    'is_commentable' => $post->is_commentable,
                    'created_at' => $post->created_at,
                ];
            });
            \Log::info('Posts mapped successfully, preparing JSON response');
            return response()->json(['posts' => $postsWithImages], 200);
        } catch (\Exception $e) {
            \Log::error('Exception in getAllPosts: ' . $e->getMessage());
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        \Log::info('Store method called with data: ', $request->all());
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'body' => 'required|string',
                'quote' => 'nullable|string',
                'category_id' => 'required|array',
                'category_id.*' => 'integer|exists:categories,id',
                'tag_id' => 'required|array',
                'tag_id.*' => 'integer|exists:tags,id',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10048',
            ]);

            \Log::info('Validation passed');

            $postData = [
                'title' => $request->input('title'),
                'body' => $request->input('body'),
                'quote' => $request->input('quote'),
                'user_id' => 1,
                'is_commentable' => $request->input('is_commentable', true),
            ];

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $postData['image'] = $imageName;
                \Log::info('Image uploaded: ' . $imageName);
            }

            $post = Post::create($postData);
            \Log::info('Post created with ID: ' . $post->id);

            $categoryIds = $request->input('category_id');
            if (is_array($categoryIds)) {
                $post->categories()->attach($categoryIds);
                \Log::info('Categories attached: ' . json_encode($categoryIds));
            }

            $tagIds = $request->input('tag_id');
            if (is_array($tagIds)) {
                $post->tags()->attach($tagIds);
                \Log::info('Tags attached: ' . json_encode($tagIds));
            }

            $response = response()->json([
                'message' => 'Post created successfully',
                'post' => [
                    'title' => $post->title,
                    'body' => $post->body,
                    'quote' => $post->quote,
                    'user_id' => $post->user_id,
                    'is_commentable' => $post->is_commentable,
                    'image' => $post->image,
                    'updated_at' => $post->updated_at->toIso8601String(),
                    'created_at' => $post->created_at->toIso8601String(),
                    'id' => $post->id,
                ]
            ], 201);
            \Log::info('Response sent with 201 status');
            return $response;
        } catch (QueryException $e) {
            \Log::error('QueryException: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create post: ' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            \Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $post = Post::findOrFail($id);
            return response()->json($post, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Post not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
public function update(Request $request, string $id)
{
    Log::info('Update method called with data:', $request->all());
    Log::info('Files:', $request->file() ?: ['No files']);

    try {
        $post = Post::findOrFail($id);

        // Validate form-data (multipart/form-data) inputs
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'quote' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10048',
            'category_id' => 'nullable|array',
            'category_id.*' => 'integer|exists:categories,id',
            'tag_id' => 'nullable|array',
            'tag_id.*' => 'integer|exists:tags,id',
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed:', $validator->errors()->toArray());
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Update fields
        $postData = [
            'title' => $request->input('title'),
            'body' => $request->input('body'),
            'quote' => $request->input('quote', $post->quote),
            'user_id' => $post->user_id, // Don't change user_id
        ];

        // Handle image upload
        if ($request->hasFile('image')) {
            if ($post->image && file_exists(public_path('images/' . $post->image))) {
                unlink(public_path('images/' . $post->image));
            }
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $postData['image'] = $imageName;
        }

        $post->update($postData);

        // Sync categories if provided
        if ($request->has('category_id')) {
            $post->categories()->sync($request->input('category_id'));
        }

        // Sync tags if provided
        if ($request->has('tag_id')) {
            $post->tags()->sync($request->input('tag_id'));
        }

        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post->fresh()
        ], 200);

    } catch (\Exception $e) {
        Log::error('Exception during update: ' . $e->getMessage());
        return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
    }
}



    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $post = Post::findOrFail($id);
            $post->delete();
            return response()->json(['message' => 'Post deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function relatedPosts($postId)
    {
        try {
            $post = Post::findOrFail($postId);
            $exactMatches = Post::where('title', $post->title)
                ->where('id', '!=', $postId)
                ->get();
            $keywords = explode(' ', strtolower($post->title));
            $keywordMatches = Post::where('title', '!=', $post->title)
                ->where(function ($query) use ($keywords) {
                    foreach ($keywords as $keyword) {
                        $query->orWhere('title', 'like', "%$keyword%");
                    }
                })
                ->where('id', '!=', $postId)
                ->get();
            $relatedPosts = $exactMatches->concat($keywordMatches)->unique('id');
            $relatedPostsWithDetails = $relatedPosts->map(function ($relatedPost) {
                return [
                    'id' => $relatedPost->id,
                    'title' => $relatedPost->title,
                    'body' => $relatedPost->body,
                    'user_name' => $relatedPost->user ? $relatedPost->user->first_name : 'Anonymous',
                    'image_url' => $relatedPost->image ? asset('images/' . $relatedPost->image) : null,
                    'created_at' => $relatedPost->created_at,
                    'quote' => $relatedPost->quote,
                ];
            });
            return $relatedPostsWithDetails;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function searchPosts(Request $request)
    {
        try {
            $keyword = $request->input('keyword');
            $posts = Post::where(function ($query) use ($keyword) {
                $query->where('title', 'like', '%' . $keyword . '%')
                    ->orWhere('body', 'like', '%' . $keyword . '%');
            })->paginate(12);
            return $posts;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function searchByCategory($categoryId)
    {
        try {
            $category = Category::findOrFail($categoryId);
            $category->load('posts.user');
            $posts = $category->posts()->paginate(12);
            $postsWithDetails = $posts->getCollection()->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'user_name' => $post->user ? $post->user->name : 'Anonymous',
                    'image_url' => $post->image ? asset('images/' . $post->image) : null,
                    'quote' => $post->quote,
                ];
            });
            $posts->setCollection($postsWithDetails);
            return $posts;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function searchByTag($tagId)
    {
        try {
            $tag = Tag::findOrFail($tagId);
            $posts = $tag->posts()->with('user')->paginate(12);
            $postsWithDetails = $posts->getCollection()->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'user_name' => $post->user ? $post->user->name : 'Anonymous',
                    'image_url' => $post->image ? asset('images/' . $post->image) : null,
                    'created_at' => $post->created_at,
                    'quote' => $post->quote,
                ];
            });
            $posts->setCollection($postsWithDetails);
            return $posts;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function postComment(Request $request, $postId)
    {
        try {
            $request->validate([
                'body' => 'required|string',
            ]);
            $post = Post::findOrFail($postId);
            $comment = new Comment();
            $comment->body = $request->input('body');
            $comment->user_id = 1; // Default user ID since authentication is removed
            $comment->order = $post->comments()->count() + 1;
            $post->comments()->save($comment);
            return response()->json(['message' => 'Comment posted successfully', 'comment' => $comment], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }
}