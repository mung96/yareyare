export type TeamListResponse = {
  teams: {
    teamId: string;
    teamName: string;
    teamLogo: string;
  }[];
};

export type StadiumResponse = {
  sections: {
    sectionName: string;
    rows: {rowName: string; columns: number[]}[];
  }[];
};
