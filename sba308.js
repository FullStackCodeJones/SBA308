// Course information
const courseInfo = {
    id: 444,
    name: "JavaScript for Dummies"
  };
  
  // Assignment group information
  const assignmentGroup = {
    id: 1111,
    name: "Imposters of JavaScript",
    course_id: 911,
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
  
  // Learner submission data
  const learnerSubmissions = [
    {
      learner_id: 1212,
      assignment_id: 1,
      submission: {
        submitted_at: "2024-31-10",
        score: 515
      }
    },
    {
      learner_id: 717,
      assignment_id: 2,
      submission: {
        submitted_at: "2024-31-10",
        score: 777
      }
    },
    {
      learner_id: 333,
      assignment_id: 3,
      submission: {
        submitted_at: "2024-31-10",
        score: 1111
      }
    },
    {
      learner_id: 313,
      assignment_id: 1,
      submission: {
        submitted_at: "2024-31-10",
        score: 908
      }
    },
    {
      learner_id: 1531,
      assignment_id: 2,
      submission: {
        submitted_at: "2024-12-12",
        score: 144 
      }
    }
  ];

  function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions){
    try{
      if (assignmentGroup.course_id !== courseInfo.id){
        throw new Error("Assignment group does not match the course id.");
      }
    } catch (error) {
      console.error(error.message);
      return;
    }
  }
  
  
  