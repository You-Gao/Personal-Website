export async function getRecentCommits(username) {
    const commitList = document.getElementById('commit-list');
    commitList.innerHTML = ''; // Clear any existing commits
    console.log('Fetching commits for', username);
    if (!username) {
        alert('Please enter a GitHub username.');
        return;
    }

    try {
        // Get the user's repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/events`);
        const events = await reposResponse.json();
    
        if (events.length === 0) {
            commitList.innerHTML = '<li>No repositories found for this user.</li>';
            return;
        }
    
        // Variable to store all commits
        let allCommits = [];
    
        // Iterate over events to get recent commits
        for (const event of events) {
            if (event.type !== 'PushEvent') {
                continue;
            }

            // Get the repo
            const repo = event.repo;
            const repoName = repo.name;

            // Get the Paylod
            const payload = event.payload;
            
            // payload.commits is an array of commits 
            const commits = payload.commits;

            // Add the commits to the allCommits array
            allCommits = allCommits.concat(commits.map(commit => ({
                repoName: repoName,
                message: commit.message,
                date: new Date(event.created_at)
            })));
        }
    
        // Sort the commits by date in descending order
        allCommits.sort((a, b) => b.date - a.date);
    
        // Append the most recent 10 commits to the commitList
        return allCommits.slice(0, 10);
    } catch (error) {
        console.error('Error fetching commits:', error);
        commitList.innerHTML = '<li>Error fetching commits. Please try again later.</li>';
    }
}

export async function setCommits() {
    const username = 'You-Gao';
    const commitList = await getRecentCommits(username);
    console.log('Commits:', commitList);
    if (commitList) {
        const commitListElement = document.getElementById('commit-list');
        commitListElement.innerHTML = commitList.map(commit => {
            const options = { 
                month: '2-digit', 
                day: '2-digit', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
            };
            const formattedDate = new Date(commit.date).toLocaleString('en-US', options);
            return `<li>${commit.repoName}: ${commit.message}</li>`;
        }).join('');
    }
}