- This is a simple and responsive Quiz App built with React and Tailwind CSS.It allows users to answer multiple-choice questions, track progress, see live scores, and view detailed results at the end.

- Features

Multiple choice quiz with dynamic questions.
Timer (30 seconds) for each question.
Navigation buttons (Previous, Skip, Next, Finish).
Live score and progress bar.
Responsive UI (works on mobile & desktop).
Results page with detailed review of answers.
Restart option after finishing the quiz.

1. App.jsx

Handles routing using React Router.
Routes:
/quiz → Quiz page
/results → Results page

2. Quiz.jsx

Shows questions with multiple options.
Timer (30s per question).
Next, Previous, Skip, Finish buttons.
Progress bar & live score.
Responsive design with Tailwind CSS.

3. Results.jsx

Displays final score.
Shows each question with your answer & correct answer.
Button to restart the quiz.

4. questions.json

Contains all quiz questions and options in JSON format.
