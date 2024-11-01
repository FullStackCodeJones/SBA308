//Course information
const courseInfo = {
  id: 444,
  name: "JavaScript for Dummies"
};

//Assignment group information
const assignmentGroup = {
  id: 1111,
  name: "Imposters of JavaScript",
  course_id: 444,
  group_weight: 37,
  assignments: [
    {
      id: 1,
      name: "Prove It",
      due_at: "2024-02-11",
      points_possible: 183.3
    },
    {
      id: 2,
      name: "Muscle Memory",
      due_at: "2024-02-11",
      points_possible: 183.3
    },
    {
      id: 3,
      name: "Full Stack of Money",
      due_at: "2025-01-02",
      points_possible: 183.3
    }
  ]
};

//Learner submission data
const learnerSubmissions = [
  {
    learner_id: 1212,
    assignment_id: 1,
    submission: {
      submitted_at: "2024-01-10",
      score: 150
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
//Note==== I had mismatched course id and had to fix it, I got carried away with the Angel numbers😂🪽

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  //Validate course ID
  if (assignmentGroup.course_id !== courseInfo.id) {
    throw new Error("Invalid assignment group: course_id does not match courseInfo.id");
  }

  const results = [];

  //Loop through learner submissions
  for (const submission of learnerSubmissions) {
    const learnerId = submission.learner_id;
    const assignmentId = submission.assignment_id;


    const assignment = assignmentGroup.assignments.find(a => a.id === assignmentId);


    let learnerData = results.find(result => result.id === learnerId);
    if (!learnerData) {
      learnerData = { id: learnerId, avg: 0, scores: {} };
      results.push(learnerData);
    }

    //Check if assignment is valid and due
    if (assignment && new Date(submission.submission.submitted_at) <= new Date(assignment.due_at)) {
      let score = submission.submission.score;
      const pointsPossible = assignment.points_possible;

      if (new Date(submission.submission.submitted_at) > new Date(assignment.due_at)) {
        score *= 0.9; // Deduct 10%
      }

      if (pointsPossible > 0) {
        const percentageScore = (score / pointsPossible) * 100;
        learnerData.scores[assignmentId] = percentageScore;

        learnerData.avg += score;
      }
    }
  }

  for (const result of results) {
    let totalPointsPossible = 0;
    for (const assignmentId in result.scores) {
      const assignment = assignmentGroup.assignments.find(a => a.id === Number(assignmentId));
      if (assignment) {
        totalPointsPossible += assignment.points_possible;
      }
    }
    result.avg = totalPointsPossible > 0 ? (result.avg / totalPointsPossible) * 100 : 0;
  }

  return results;
}
const learnerDataResults = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
console.log(learnerDataResults);