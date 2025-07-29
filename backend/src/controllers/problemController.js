import Problem from '../models/Problem.js';

export const createProblem = async (req, res) => {
  const { title, description, location,userID,_id} = req.body;
console.log("req.body",req.body);

  try {
    const problem = new Problem({
      title,
      description,
      location,
      createdBy: userID,
    });

    await problem.save();

    res.status(201).json(problem);
  } catch (error) {
    console.error('❌ Problem creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all problems
export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.status(200).json(problems);
  } catch (error) {
    console.error('❌ Get problems error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
