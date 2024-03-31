export type PilledLanguage = {
  name: string;
  score: number;
  realPercentage: number;
  percentage: number;
};

export type PillgorithmReturn = {
  pilledLanguages: PilledLanguage[];
  maxScore: number;
};

export type PillgorithmRepositoryInfo = {
  languages: { name: string; size: number }[];
};

export function pillgorithm<T extends PillgorithmRepositoryInfo>(
  repositories: T[]
): PillgorithmReturn {
  const reposWithPercentages = repositories.map((repo) => {
    const totalBytes = repo.languages.reduce((acc, { size }) => acc + size, 0);

    const repoLanguagePercentages = repo.languages.reduce(
      (acc, { size, name }) => {
        acc[name] = (size / totalBytes) * 100;
        return acc;
      },
      {} as {
        [langName: string]: number;
      }
    );
    return { ...repo, repoLanguagePercentages };
  });

  const numberOfRepos = repositories.length;

  const languageRankingPercentage = reposWithPercentages.reduce((acc, repo) => {
    const languages = Object.entries(repo.repoLanguagePercentages);
    languages.forEach(([lang, score]) => {
      if (acc[lang]) {
        acc[lang] += score / numberOfRepos;
      } else {
        acc[lang] = score / numberOfRepos;
      }
    });
    return acc;
  }, {} as { [langName: string]: number });

  const maxScore = Object.values(languageRankingPercentage).reduce(
    (acc, score) => Math.max(acc, score),
    0
  );

  const pilledLanguages = Object.entries(languageRankingPercentage)
    .map(([lang, score]) => {
      const precentageVal = score / maxScore;
      const cappedPercentage = 0.25 + precentageVal * 0.75;
      const beutifiedPercentage = Math.round(cappedPercentage * 10000) / 100;

      return {
        name: lang,
        score,
        realPercentage: precentageVal,
        percentage: beutifiedPercentage,
      };
    })
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  return { pilledLanguages, maxScore };
}
