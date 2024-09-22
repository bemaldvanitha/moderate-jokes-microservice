const express = require("express");
const { acceptJoke, rejectJoke, getNonModeratedJoke, deleteJoke } = require('../controllers/moderateController');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Moderation
 *   description: Joke moderation operations
 */

/**
 * @swagger
 * /jokes/non-moderate:
 *   get:
 *     tags: [Moderation]
 *     summary: Get a non-moderated joke
 *     security:
 *       - bearerAuth: []  # Assuming you're using Bearer token authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved a non-moderated joke
 *       401:
 *         description: Unauthorized
 */
router.get('/non-moderate', auth, getNonModeratedJoke);

/**
 * @swagger
 * /jokes/accept/{id}:
 *   patch:
 *     tags: [Moderation]
 *     summary: Accept a joke
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the joke to accept
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               joke:
 *                 type: string
 *                 example: "Why did the chicken cross the road? To get to the other side!"
 *               type:
 *                 type: string
 *                 example: "funny"
 *     responses:
 *       200:
 *         description: Joke accepted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Joke not found
 */
router.patch('/accept/:id', auth, acceptJoke);

/**
 * @swagger
 * /jokes/reject/{id}:
 *   patch:
 *     tags: [Moderation]
 *     summary: Reject a joke
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the joke to reject
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joke rejected successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Joke not found
 */
router.patch('/reject/:id', auth, rejectJoke);

/**
 * @swagger
 * /jokes/delete/{id}:
 *   delete:
 *     tags: [Moderation]
 *     summary: Delete a joke
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the joke to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joke deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Joke not found
 */
router.delete('/delete/:id', auth, deleteJoke);

module.exports = router;