document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const videoList = document.getElementById('video-list');
    const videoPlayer = document.getElementById
3.  Populates the video list (`<ul>`) on the page.
4.  Adds click handlers to each('video-player');
    const videoTitle = document.getElementById('video-title');
    const loadingIndicator = document.getElementById('loading-indicator');
    const loadingProgress = document.getElementById('loading-progress');
    const errorMessage = document.getElementById('error-message video list item.
5.  When a video is clicked:
    *   Fetches the `manifest.json` for that video.
    *   Downloads all video chunk files listed in the manifest.
    *   Shows a loading progress indicator.');
    const playerArea = document.getElementById('player-area'); // Get player area for visibility toggle

    // Constants
    *   Combines the downloaded chunks into a single Blob in the browser's memory.
    *   Creates a
    const VIDEOS_BASE_URL = 'videos/'; // Relative path to the folder containing video subfolders
    const VIDEO_INDEX temporary URL (`Object URL`) for this Blob.
    *   Sets the `<video>` player's source to this temporary_URL = 'videos.json'; // Path to the main index file in the repo root
    const CHUNK_MANIFEST URL and attempts to play it.
    *   Includes error handling and cleans up old temporary URLs.

```javascript
// script_FILENAME = 'manifest.json'; // Filename for the manifest inside each video folder

    // State
    let currentObjectUrl = null;.js

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const videoList = // To store and revoke the Blob URL for the currently loaded video

    // --- Helper Functions ---

    /**
     * Displays an error message in document.getElementById('video-list');
    const videoPlayer = document.getElementById('video-player');
     the designated area and logs to console.
     * @param {string} message - The error message to display.
     */
    function displayconst videoTitle = document.getElementById('video-title');
    const loadingIndicator = document.getElementById('loading-indicator');
    const loadingProgress = document.getElementById('loading-progress');
    const errorMessage = document.getElementByIdError(message) {
        console.error("Error:", message); // Log the error for debugging
        errorMessage.textContent = `('error-message');

    // --- Configuration ---
    const VIDEOS_BASE_URL = 'videos/';Error: ${message}`;
        errorMessage.style.display = 'block'; // Show error message area
        loadingIndicator.style.display // Relative path to the folder containing video subfolders
    const VIDEO_INDEX_URL = 'videos.json'; // Path to the main index = 'none'; // Hide loading indicator
        playerArea.style.display = 'block'; // Ensure player area is visible to file (in the root)
    const CHUNK_MANIFEST_FILENAME = 'manifest.json'; // Filename inside each video folder

    // --- State ---
    let currentObjectUrl = null; // To store and revoke the Blob show the error
        videoPlayer.style.display = 'none'; // Hide the video element itself
    }

    /**
 URL later

    // --- Helper Functions ---

    /**
     * Displays an error message to the user and logs     * Clears any previously shown error messages.
     */
    function clearError() {
        errorMessage.textContent = it to the console.
     * @param {string} message The error message to display.
     */
    function displayError(message) {
        console.error(message); // Log error for debugging
        errorMessage.textContent = ` '';
        errorMessage.style.display = 'none';
    }

    // --- Core Functions ---

    /**Error: ${message}`;
        errorMessage.style.display = 'block'; // Show the error element
        loadingIndicator.style.display
     * Fetches the list of available videos from videos.json and populates the UI list.
     */
    async function = 'none'; // Hide loading indicator if it was visible
        videoPlayer.style.display = 'none'; // Hide the fetchVideoList() {
        clearError();
        videoList.innerHTML = '<li>Loading videos...</li>'; // Initial player area on error
    }

    /**
     * Fetches the list of available videos from videos.json and populates the UI list.
     */
    async function fetchVideoList() {
        videoList.innerHTML = '<li> loading message

        try {
            // Fetch the index file, appending a timestamp for cache busting
            const response = await fetch(`${VIDEO_INDEX_URL}?t=${Date.now()}`);

            if (!response.ok) {Loading videos...</li>'; // Initial loading message
        errorMessage.style.display = 'none'; // Hide any previous errors

        try {
            
                // Handle HTTP errors (like 404 Not Found)
                throw new Error(`Failed to load video index (${VIDEO_INDEX_URL}): ${response.status} ${response.statusText}`);
            }

            const videos// Fetch the index file. Add cache-busting query parameter.
            const response = await fetch(VIDEO_INDEX_URL + `?t=${Date.now()}`);

            if (!response.ok) {
                throw new Error(`Failed to load video = await response.json();

            videoList.innerHTML = ''; // Clear the 'Loading...' message

            if (! index (${VIDEO_INDEX_URL}): ${response.status} ${response.statusText}`);
            }

            const videos = await response.json(); // Parse the JSON response

            videoList.innerHTML = ''; // Clear the loading message

            if (!Array.isArray(videos)) {
                 throw new Error(`Invalid format: ${VIDEO_INDEX_URL} did not return a JSON array.`);
            }

            if (videos.length === 0) {
                videoList.innerHTML = 'Array.isArray(videos)) {
                 throw new Error(`Invalid format in ${VIDEO_INDEX_URL}: Expected an array.`);
            }

            if (videos.length === 0) {
                videoList.innerHTML = '<li>No videos found.</li>';
<li>No videos found in index.</li>';
                return;
            }

            // Sort videos alphabetically by title for consistent display
            videos.sort((a, b) => (a.title || a.folder).localeCompare(b.                return;
            }

            // Populate the list with video entries
            videos.forEach(video => {
                iftitle || b.folder));

            // Populate the list with clickable video titles
            videos.forEach(video => (!video.folder || !video.title) {
                    console.warn('Skipping invalid video entry in index {
                if (!video.folder) {
                    console.warn("Skipping video entry with missing 'folder' property:", video);
                    :', video);
                    return; // Skip entries missing required fields
                }
                const li = document.createElement('li');
                return; // Skip entries without a folder name
                }
                const li = document.createElement('li');
                li.textContent = video.title; // Display the video title
                li.dataset.folder = video.folder; // Store theli.textContent = video.title || video.folder; // Use title, fallback to folder name
                li. folder name in a data attribute
                li.title = `Load video: ${video.title} (Folder: ${video.folder})`;dataset.folder = video.folder; // Store folder name for retrieval on click
                li.addEventListener('click', () => loadVideo(video.folder));
                videoList.appendChild(li);
            });

        } catch (error) {
             // Tooltip
                li.addEventListener('click', () => {
                    // Remove 'active' class from anydisplayError(`Could not load video list. Ensure ${VIDEO_INDEX_URL} exists in the repository root and is valid JSON. Details other list item
                    document.querySelectorAll('#video-list li.active').forEach(item => item.classList.remove('active'));
: ${error.message}`);
            videoList.innerHTML = '<li>Error loading video list.</li>'; // Update                    // Add 'active' class to the clicked item
                    li.classList.add('active');
                    loadVideo( list state on error
        }
    }

    /**
     * Loads and plays the video corresponding to the givenvideo.folder); // Call the function to load this video
                 });
                videoList.appendChild(li);
            });

        } catch (error) {
            displayError(`Could not load video list. Ensure '${VIDEO_INDEX_URL}' folder name.
     * Fetches the manifest, then downloads and combines chunks.
     * @param {string} folderName - The unique folder name of the video to load.
     */
    async function loadVideo(folderName) {
        console.log(`Attempting to load video from folder: ${folderName}`);
        clearError(); // exists in the repository root and is valid JSON. Details: ${error.message}`);
            videoList.innerHTML = '<li>Error loading video list.</li>';
        }
    }

    /**
     * Loads and prepares a video for playback by Clear previous errors
        videoTitle.textContent = `Loading: ${folderName}...`; // Update title display
        loading fetching its manifest and chunks.
     * @param {string} folderName The name of the folder containing the video chunks andIndicator.style.display = 'block'; // Show spinner/progress
        loadingProgress.value = 0; // manifest.
     */
    async function loadVideo(folderName) {
        console.log(`Attempting to load video from folder: ${folderName}`);
        videoTitle.textContent = `Loading: ${folderName}...`; // Update UI Reset progress bar
        playerArea.style.display = 'block'; // Ensure player area container is visible
        videoPlayer.style title
        loadingIndicator.style.display = 'block'; // Show loading spinner/progress
        loadingProgress.value =.display = 'none'; // Hide video element while loading

        // Revoke the previous Blob URL to free up memory
        if 0; // Reset progress bar
        errorMessage.style.display = 'none'; // Hide previous errors
        videoPlayer.style.display = 'none'; // Hide player while loading
        videoPlayer.pause(); // Pause if it was somehow playing

        // --- Cleanup (currentObjectUrl) {
            console.log("Revoking previous Object URL:", currentObjectUrl);
            URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = null;
            videoPlayer.removeAttribute('src'); // Fully remove the src attribute
        }

        try {
            // 1. Fetch the manifest file for this specific video
            const manifestUrl = `${ Previous Video ---
        // Revoke the previous object URL to free up memory
        if (currentObjectUrl) {
            console.log("Revoking previous Object URL:", currentObjectUrl);
            URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = null;
        }
        videoPlayer.removeAttribute('src'); // Remove the src attribute entirely


        try {
            // 1. Fetch the manifest file for this specific video
            const manifestUrl = `${VIDEOS_BASE_URL}${folderName}/${CHUNK_MANIFEST_FILENAME}?t=${Date.now()}`;
            console.log("Fetching manifest:", manifestUrl);
            const manifestResponse = await fetch(manifestUrl);

            if (!manifestResponse.ok) {
                throw new Error(`Could not load manifest (${CHUNK_MANIFEST_FILENAME}) for "${folderName}": ${manifestVIDEOS_BASE_URL}${folderName}/${CHUNK_MANIFEST_FILENAME}?t=${Date.now()}`; //Response.status} ${manifestResponse.statusText}`);
            }

            const manifest = await manifestResponse.json();
 Cache busting
            console.log("Fetching manifest:", manifestUrl);
            const manifestResponse = await fetch(manifestUrl);

            console.log("Manifest loaded:", manifest);

            // Validate manifest content
            if (!manifest || !Array.isArray(manifest.chunks            if (!manifestResponse.ok) {
                throw new Error(`Could not load manifest for '${folderName}' (${) || manifest.chunks.length === 0) {
                throw new Error(`Invalid or empty manifest file for "${manifestUrl}): ${manifestResponse.status} ${manifestResponse.statusText}`);
            }

            const manifest = awaitfolderName}". It must contain a "chunks" array.`);
            }

            const chunks = manifest.chunks; manifestResponse.json(); // Parse manifest JSON

            // Validate manifest content
            if (!manifest || !Array.isArray(manifest.chunks
            const mimeType = manifest.mimeType || 'video/mp4'; // Get MIME type, default to mp) || manifest.chunks.length === 0) {
                throw new Error(`Invalid or empty manifest file for '${folderName}'. Missing 'chunks4
            videoTitle.textContent = manifest.title || folderName; // Update title from manifest if available

            //' array.`);
            }

            const chunks = manifest.chunks;
            const mimeType = manifest.mimeType || 'video/mp4 2. Fetch all video chunk files listed in the manifest
            const chunkBlobs = [];
            let loaded'; // Get mime type, default to mp4
            const displayTitle = manifest.title || folderName; // Use title fromBytes = 0;
            loadingProgress.max = chunks.length; // Set progress max based on number of chunks

            console manifest, fallback to folder
            videoTitle.textContent = displayTitle; // Update title properly

            console.log(`Manifest.log(`Fetching ${chunks.length} chunks...`);
            for (let i = 0; i < chunks.length; i loaded. Title: ${displayTitle}, MimeType: ${mimeType}, Chunks: ${chunks.length}`);

            //++) {
                const chunkName = chunks[i];
                // Construct URL carefully: base path + folder + chunk filename
                const chunkUrl = `${VIDEOS_BASE_URL}${folderName}/${chunkName}?t=${Date.now()}`;
 2. Fetch all video chunks sequentially (or in parallel if desired, but sequential is simpler)
            const chunkBlobs = [];
            let totalBytesLoaded = 0;
            loadingProgress.max = chunks.length; // Set progress                console.log(`Fetching chunk ${i + 1}/${chunks.length}: ${chunkUrl}`);

                try {
                    const chunkResponse = await fetch(chunkUrl);
                    if (!chunkResponse.ok) {
                        throw new Error bar max value

            console.log("Starting chunk download...");
            for (let i = 0; i < chunks.(`Failed to fetch chunk "${chunkName}": ${chunkResponse.status} ${chunkResponse.statusText}`);
                    length; i++) {
                const chunkName = chunks[i];
                if (!chunkName) {
                     console.warn(`Ski}
                    const blob = await chunkResponse.blob();
                    chunkBlobs.push(blob);
                    loadedBytes += blob.size;pping invalid chunk name at index ${i} in manifest for ${folderName}`);
                     continue; // Skip empty chunk names
                }
                const chunkUrl = `${VIDEOS_BASE_URL}${folderName}/${chunkName}?
                    loadingProgress.value = i + 1; // Update progress bar
                    console.log(`Fetched chunk ${i + 1}, size: ${blob.size} bytes`);
                } catch (chunkError) {
                    // Stop the entiret=${Date.now()}`; // Cache busting
                // console.log(`Fetching chunk ${i + 1}/${chunks.length}: process if one chunk fails
                    throw new Error(`Download failed for chunk "${chunkName}". ${chunkError.message}`);
                }
 ${chunkUrl}`); // Verbose logging

                try {
                    const chunkResponse = await fetch(chunkUrl);
                    if (!chunkResponse            }

            console.log(`All ${chunks.length} chunks downloaded successfully. Total size: ${(loadedBytes / (102.ok) {
                        throw new Error(`Failed to fetch chunk ${chunkName} (${chunkUrl}): ${chunk4 * 1024)).toFixed(2)} MB`);
            loadingIndicator.style.display = 'none'; // Hide loading indicator

Response.status} ${chunkResponse.statusText}`);
                    }

                    const blob = await chunkResponse.blob            // 3. Combine the downloaded Blobs into a single Blob
            console.log("Combining chunks into a single Blob...");
            const(); // Get chunk data as a Blob
                    chunkBlobs.push(blob);
                    totalBytesLoaded += blob.size;
 combinedBlob = new Blob(chunkBlobs, { type: mimeType });
            console.log(`Combined Blob                    loadingProgress.value = i + 1; // Update progress bar
                    // console.log(`Fetched chunk ${i + 1}, created. Size: ${(combinedBlob.size / (1024 * 1024)).toFixed(2)} MB, Type size: ${blob.size}`); // Verbose logging

                } catch (chunkError) {
                    // If: ${combinedBlob.type}`);

            // 4. Create an Object URL for the combined Blob
            current one chunk fails, stop the entire loading process for this video
                    throw new Error(`Download failed for chunk ${chunkName}. ${ObjectUrl = URL.createObjectURL(combinedBlob);
            console.log("Created Object URL:", currentObjectUrlchunkError.message}`);
                }
            }

            console.log(`All chunks downloaded successfully. Total size: ${(totalBytesLoaded /);

            // 5. Set the video player source and attempt to play
            videoPlayer.src = currentObjectUrl;
            video (1024 * 1024)).toFixed(2)} MB`);
            loadingIndicator.stylePlayer.style.display = 'block'; // Show the video element
            videoPlayer.play().catch(e.display = 'none'; // Hide loading indicator

             // 3. Combine all fetched Blobs into a single Blob
             if => {
                console.warn("Autoplay was prevented by the browser:", e);
                // Autoplay might fail (chunkBlobs.length === 0) {
                 throw new Error("No valid chunk data was downloaded.");
             }
, but the video is loaded and user can click play.
            });

        } catch (error) {
            displayError(`             console.log("Combining chunks into a single Blob...");
             const combinedBlob = new Blob(chunkBlobsFailed to load video "${folderName}". ${error.message}`);
            videoTitle.textContent = `Error loading ${, { type: mimeType });
             console.log(`Combined Blob created. Size: ${(combinedBlob.size / (10folderName}`; // Update title to reflect error
        }
    }

    // --- Initialisation ---

    // Fetch the list24 * 1024)).toFixed(2)} MB, Type: ${combinedBlob.type}`);

             // 4. Create an of videos when the page loads
    fetchVideoList();

}); // End of DOMContentLoaded
