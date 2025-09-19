<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JobCandidateController; 
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\QuestionAnswerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\TipController;
use App\Http\Controllers\CounterController;
use App\Http\Controllers\CaseStudyController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\CookieConsentController;

// Authentication Routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/posts/search', [PostController::class, 'searchPosts']);
Route::get('/posts/{id}/related-posts', [PostController::class, 'relatedPosts']);
Route::get('/posts/categories/{categoryId}', [PostController::class, 'searchByCategory']);
Route::get('/posts/tags/{tagId}', [PostController::class, 'searchByTag']);
Route::post('/posts/{postId}/comments', [PostController::class, 'postComment']);
Route::get('/get-all-post', [PostController::class, 'getposts']);

Route::prefix('comments')->group(function () {
    Route::get('/', [CommentController::class, 'index']);
    Route::get('/posts/{postId}', [CommentController::class, 'getCommentsAndRepliesByPost']);
    Route::post('/posts/{postId}/{commentId}/reply', [CommentController::class, 'replyToComment']);
});
Route::resource('posts', PostController::class)->only(['index', 'store', 'show', 'update', 'destroy']);

// Dashboard Routes
Route::prefix('dashboard')->group(function () {
    Route::get('/blog-admin/posts', [PostController::class, 'adminPosts']);
    Route::get('/posts/{postId}/comments', [CommentController::class, 'getCommentsAndRepliesByPost']);
    Route::put('/posts/{postId}/update-comments-status', [CommentController::class, 'isCommentable']);
    Route::delete('/posts/comments/{commentId}', [CommentController::class, 'deleteComment']);
    Route::put('/comments/{commentId}/update-approval-status', [CommentController::class, 'updateApprovalStatus']);
    Route::put('/comments/replies/{reply}', [CommentController::class, 'updateApproval']);
});

// Job Routes
Route::resource('jobs', JobController::class)->only(['index', 'store', 'show', 'update', 'destroy']);

Route::prefix('apply-job')->group(function () {
    Route::get('/', [JobCandidateController::class, 'index']);
    Route::post('/', [JobCandidateController::class, 'store']);
    Route::get('/{id}', [JobCandidateController::class, 'show']); 
    Route::put('/{id}', [JobCandidateController::class, 'update']); 
    Route::delete('/{id}', [JobCandidateController::class, 'destroy']); 
});

// Team Member Routes
Route::resource('team-members', TeamMemberController::class)->only(['index', 'store', 'show', 'update', 'destroy']);

// Question and Answer Routes
Route::prefix('questions')->group(function () {
    Route::get('/', [QuestionAnswerController::class, 'getQuestions']);
    Route::post('/', [QuestionAnswerController::class, 'createQuestion']);
    Route::post('/{question_id}/answers', [QuestionAnswerController::class, 'createAnswer']);
});

// Category and Tag Routes
Route::resource('categories', CategoryController::class);
Route::resource('tags', TagController::class);

// FAQ Routes
Route::resource('faqs', FAQController::class)->only(['index', 'store', 'show', 'update', 'destroy']);

// Testimonial Routes
Route::prefix('testimonials')->group(function () {
    Route::get('/', [TestimonialController::class, 'index']);
    Route::get('/{id}', [TestimonialController::class, 'show']);
    Route::post('/', [TestimonialController::class, 'store']);
    Route::put('/{id}', [TestimonialController::class, 'update']); 
    Route::delete('/{id}', [TestimonialController::class, 'destroy']);
});
// Gallery Routes
Route::prefix('gallery')->group(function () {
    Route::get('/', [GalleryController::class, 'index']);
    Route::get('/{id}', [GalleryController::class, 'show']);
    Route::post('/', [GalleryController::class, 'store']);
    Route::match(['put', 'post'], '/{id}', [GalleryController::class, 'update'])->name('gallery.update');
    Route::delete('/{id}', [GalleryController::class, 'destroy']);
});

// Tip Routes
Route::prefix('tips')->group(function () {
    Route::get('/', [TipController::class, 'index']);
    Route::post('/', [TipController::class, 'store']);
    Route::get('/{id}', [TipController::class, 'show']);
    Route::put('/{id}', [TipController::class, 'update']); 
    Route::delete('/{id}', [TipController::class, 'destroy']); 
});

// Counter Routes
Route::prefix('counters')->group(function () {
    Route::get('/', [CounterController::class, 'index']);
    Route::post('/', [CounterController::class, 'store']);
    Route::put('/{id}', [CounterController::class, 'update']);
});

// Case Study Routes
Route::resource('case-studies', CaseStudyController::class)->only(['index', 'store', 'show', 'update', 'destroy']);

// Portfolio Routes
Route::resource('portfolios', PortfolioController::class)->only(['index', 'store', 'show', 'update', 'destroy']);

// Appointment Routes
Route::resource('appointments', AppointmentController::class)->only(['index', 'store', 'show', 'update', 'destroy']);

//Cookie Consent Routes
Route::post('/cookie-consent', [CookieConsentController::class, 'store']);