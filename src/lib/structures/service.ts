import { generateManifest } from "material-icon-theme"
import type { FolderSettings, FolderStructure } from "./types"

/**
 * Fetches folder settings from a given URL
 */
export async function fetchFolderSettings(settingsUrl: string): Promise<FolderSettings | null> {
    try {
        let url = settingsUrl
        if (!settingsUrl.startsWith("https://")) {
            url = settingsUrl + "settings.json"
        }

        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to fetch settings: ${response.statusText}`)
        }

        const data: FolderSettings = await response.json()
        return data
    } catch (error) {
        console.error("Failed to load folder settings", error)
        return null
    }
}

/**
 * Fetches markdown content for a given file name
 */
export async function fetchMarkdownContent(
    fileName: string,
    settingsUrl: string
): Promise<string | null> {
    if (!fileName) {
        return null
    }

    try {
        let url: string
        if (settingsUrl.startsWith("https://")) {
            url = `${settingsUrl}md/${fileName.toLowerCase()}.md.md`
        } else {
            // Fetch from GitHub repository
            url = `https://raw.githubusercontent.com/the-corner-inc/structures/main/public${settingsUrl}md/${fileName.toLowerCase()}.md`
        }

        const response = await fetch(url)
        if (!response.ok) {
            return null
        }

        const text = await response.text()
        return text
    } catch (error) {
        console.error("Failed to load markdown content", error)
        return null
    }
}

/**
 * Finds an element by name in the folder structure tree
 */
export function findElementByName(
    structures: FolderStructure[],
    name: string
): FolderStructure | null {
    for (const folder of structures) {
        if (folder.name === name) {
            return folder
        }

        if (folder.children && folder.children.length > 0) {
            const found = findElementByName(folder.children, name)
            if (found) {
                return found
            }
        }
    }

    return null
}

/**
 * Generates material icon theme manifest from config
 */
export function getManifest(config?: any) {
    return generateManifest(config)
}

/**
 * Filters folder structures based on search query
 */
export function filterFolderStructures(
    structures: FolderStructure[],
    query: string
): FolderStructure[] {
    if (!query) {
        return structures
    }

    const lowerQuery = query.toLowerCase()

    return structures
        .map((structure) => {
            // Check if current item matches
            const nameMatches = structure.name.toLowerCase().includes(lowerQuery)

            // Recursively filter children
            const filteredChildren = structure.children
                ? filterFolderStructures(structure.children, query)
                : []

            // Include if name matches or has matching children
            if (nameMatches || filteredChildren.length > 0) {
                return {
                    ...structure,
                    children: filteredChildren.length > 0 ? filteredChildren : structure.children
                }
            }

            return null
        })
        .filter((item): item is FolderStructure => item !== null)
}
