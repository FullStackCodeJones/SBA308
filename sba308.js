// Course information
const courseInfo = {
  id: 444,
  name: "JavaScript for Dummies" // This course is all about making JavaScript easy peasy!
};

// Assignment group information
const assignmentGroup = {
  id: 1111,
  name: "Imposters of JavaScript", // Don't be fooled by the name, this group has serious assignments!
  course_id: 444, // Ensure the course ID matches for validation.
  group_weight: 37,
  assignments: [
    {
      id: 1,
      name: "Prove It", // Time to show what you've got!
      due_at: "2024-02-11", // Mark your calendars!
      points_possible: 183.3 // This is the max score you can earn for this assignment.
    },
    {
      id: 2,
      name: "Muscle Memory", // Practice makes perfect, right?
      due_at: "2024-02-11",
      points_possible: 183.3
    },
    {
      id: 3,
      name: "Full Stack of Money", // Let's stack that knowledge, uhm and of course 💰!
      due_at: "2025-01-02",
      points_possible: 183.3
    }
  ]
};

// Learner submission data
const learnerSubmissions = [
  {
    learner_id: 1212,
    assignment_id: 1,
    submission: {
      submitted_at: "2024-01-10", // Submission date for the assignment.
      score: 150 // The score earned by the learner.
    }
  },
  {
    learner_id: 717,
    assignment_id: 2,
    submission: {
      submitted_at: "2024-01-10",
      score: 180
    }
  },
  {
    learner_id: 333,
    assignment_id: 3,
    submission: {
      submitted_at: "2024-12-12",
      score: 190
    }
  },
  {
    learner_id: 313,
    assignment_id: 1,
    submission: {
      submitted_at: "2024-01-09",
      score: 100
    }
  },
  {
    learner_id: 1531,
    assignment_id: 2,
    submission: {
      submitted_at: "2024-12-11",
      score: 144
    }
  }
];
// Note==== I had mismatched course id and had to fix it, I got carried away with the Angel numbers😂🪽

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  // Validate course ID
  if (assignmentGroup.course_id !== courseInfo.id) {
    throw new Error("Invalid assignment group: course_id does not match courseInfo.id"); // Oops! This means there's a mistake.
  }

  const results = [];

  // Loop through learner submissions
  for (const submission of learnerSubmissions) {
    const learnerId = submission.learner_id; // Get the learner ID.
    const assignmentId = submission.assignment_id; // Get the assignment ID.

    const assignment = assignmentGroup.assignments.find(a => a.id === assignmentId); // Find the matching assignment.

    let learnerData = results.find(result => result.id === learnerId); // Check if we already have data for this learner.
    if (!learnerData) {
      learnerData = { id: learnerId, avg: 0, scores: {} }; // Create new learner data if not found.
      results.push(learnerData); // Add it to the results!
    }

    // Check if assignment is valid and due
    if (assignment && new Date(submission.submission.submitted_at) <= new Date(assignment.due_at)) {
      let score = submission.submission.score; // Grab the score from submission.
      const pointsPossible = assignment.points_possible; // Max points possible for the assignment.

      // Apply penalty for late submission (10% deduction)
      if (new Date(submission.submission.submitted_at) > new Date(assignment.due_at)) {
        score *= 0.9; // Deduct 10%
      }

      if (pointsPossible > 0) {
        // Calculate percentage score
        const percentageScore = (score / pointsPossible) * 100; // Calculate the score as a percentage.
        learnerData.scores[assignmentId] = percentageScore; // Store the percentage score for this assignment.

        learnerData.avg += score; // Add the score to the average.
      }
    }
  }

  // Calculate average for each learner
  for (const result of results) {
    let totalPointsPossible = 0;
    for (const assignmentId in result.scores) {
      const assignment = assignmentGroup.assignments.find(a => a.id === Number(assignmentId)); // Find the assignment based on ID.
      if (assignment) {
        totalPointsPossible += assignment.points_possible; // Add up total points possible.
      }
    }
    result.avg = totalPointsPossible > 0 ? (result.avg / totalPointsPossible) * 100 : 0; // Calculate average percentage.
  }

  return results; // Return the processed results.
}

const learnerDataResults = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions); // Call the function to get learner data.
console.log(learnerDataResults); // Display results in the console.

try {
  const learnerDataResults = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
  console.log(learnerDataResults); // Log the results again, just to be safe.
} catch (error) {
  console.error("Error processing learner data:", error.message); // Catch and display any errors.
}

function displayResults(results) {
  results.forEach(result => {
    console.log(`Learner ID: ${result.id}, Average Score: ${result.avg.toFixed(2)}`); // Show learner ID and average score.
    console.log('Scores:', result.scores); // Display scores for each assignment.
  });
}

// Call the display function
displayResults(learnerDataResults); // Finally, display the learner results.
