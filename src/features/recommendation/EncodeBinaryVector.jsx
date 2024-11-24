export default function EncodeBinaryVector({ skills, projects }) {
  const encodedProjects = projects.map((project) => {
    // Ensure tags is an array
    const tags = Array.isArray(project.tags) ? project.tags : [];

    // Normalize skills and tags for case-insensitive comparison
    const normalizedSkills = skills.map((skill) => skill.trim().toLowerCase());
    const normalizedTags = tags.map((tag) => tag.trim().toLowerCase());

    // Create binary vector
    const binaryVector = normalizedTags.map((tag) =>
      normalizedSkills.includes(tag) ? 1 : 0
    );

    // console.log("Normalized Skills:", normalizedSkills);
    // console.log("Normalized Tags:", normalizedTags);
    // console.log("Binary Vector:", binaryVector);

    // Calculate similarity score
    const similarityScore = binaryVector.reduce((acc, val) => acc + val, 0);
    // console.log(
    //   "Similarity Score for Project:",
    //   project.title,
    //   similarityScore
    // );

    return { ...project, binaryVector, similarityScore };
  });

  return encodedProjects;
}
