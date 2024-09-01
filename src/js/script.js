const downloads = {
    "IceCreamMC": {
        title: "IceCreamMC",
        github: "IceCreamMC/IceCream",
        desc: "Releases for IceCreamMC",
        github_releases: null,
    },
};

function githubFetch(repo) {
    return window
        .fetch(`https://api.github.com/repos/${repo}/releases`)
        .then((response) => {
            if (response.status >= 400) return null;
            return response.json();
        });
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
    let tabs = "",
        tabContents = "";
    for (const id in downloads) {
        const title = downloads[id].title;
        tabs += `<li class="tab"><a href="#${id}">${title}</a></li>`;

        tabContents += `
        <div id="${id}" class="col s12">
          <div class="download-content">
            <div class="download-desc">${downloads[id].desc}</div>
              <div class="progress">
                  <div class="indeterminate"></div>
              </div>
          </div>
        </div>`;
    }
    document.getElementById("content").innerHTML = `
      <div class="col s12">
        <ul id="downloads-tabs" class="tabs">
          ${tabs}
        </ul>
      </div>
      ${tabContents}`;

    for (const id in downloads) {
        // Fetch GitHub releases
        githubFetch(downloads[id].github)
            .then((releases) => {
                downloads[id].github_releases = releases;
                loadGithubReleases(id);
            })
            .catch((e) => {
                console.error(e);
                document.getElementById(id).innerText +=
                    "Failed to load GitHub releases.";
            });
    }

    M.Tabs.init(document.querySelector("#downloads-tabs"), {
        onShow: (e) => {
            history.pushState(null, null, "#" + e.getAttribute("id"));
        },
    });
});

function loadGithubReleases(id) {
    const releases = downloads[id].github_releases;
    const container = document
        .getElementById(id)
        .querySelector(".download-content");

    if (releases == null || releases.length === 0) {
        container.innerHTML += `<div>No GitHub releases found.</div>`;
        return;
    }

    let releaseRows = releases
        .map((release) => {
            const releaseDate = new Date(release.published_at).toISOString().split("T")[0];
            const assets = release.assets
                .filter((asset) => asset.name.endsWith(".jar"))
                .map((asset) => {
                    return `<a href="${asset.browser_download_url}" class="btn download-jarvec" download="${asset.name}" title="Download ${asset.name}">Download ${escapeHTML(release.tag_name)}</a>`;
                })
                .join("<br>");

            return `<tr>
                      <td>${escapeHTML(release.tag_name)}</td>
                      <td>${releaseDate}</td>
                      <td>${assets}</td>
                    </tr>`;
        })
        .join("");

    container.innerHTML += `
      <div class="builds-title">GitHub Releases</div>
      <table class="builds-table striped">
        <thead>
          <tr>
            <th width="30%">Release</th>
            <th width="20%">Date</th>
            <th width="50%">Download</th>
          </tr>
        </thead>
        <tbody>
          ${releaseRows}
        </tbody>
      </table>
      <div class="versions-btn">
        <button class="btn" onclick="showVersionSelector('${id}')">Download Other Versions</button>
      </div>
    `;
}

function showVersionSelector(id) {
    const releases = downloads[id].github_releases;
    const versionOptions = releases
        .map(
            (release) =>
                `<option value="${release.tag_name}">${escapeHTML(
                    release.tag_name
                )}</option>`
        )
        .join("");

    const container = document.getElementById(id).querySelector(".download-content");
    container.innerHTML += `
      <div class="version-selector">
        <label for="version-select">Select Version:</label>
        <select id="version-select" class="browser-default">
          ${versionOptions}
        </select>
        <button class="btn" onclick="downloadSelectedVersion('${id}')">Download</button>
      </div>
    `;
}

function downloadSelectedVersion(id) {
    const selectedVersion = document.getElementById("version-select").value;
    const releases = downloads[id].github_releases;
    const selectedRelease = releases.find(
        (release) => release.tag_name === selectedVersion
    );

    if (selectedRelease && selectedRelease.assets.length > 0) {
        const jarAsset = selectedRelease.assets.find((asset) =>
            asset.name.endsWith(".jar")
        );

        if (jarAsset) {
            window.location.href = jarAsset.browser_download_url;
        } else {
            alert("No JAR file found for the selected version.");
        }
    } else {
        alert("Selected version not found or no assets available.");
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function copy(string) {
    await navigator.clipboard.writeText(string);
}
