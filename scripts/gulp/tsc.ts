import { dest, lastRun, src, watch } from 'gulp'
import { spawn } from 'child_process'
import { output, srcPath, tsconfigESMPath } from './paths'
import { createTask, modifyFile, named, toSystem } from './helper'
import { join } from 'path'
import { buildTarget } from './env'
import changed from 'gulp-changed'

const typescriptCLI = join(require.resolve('ttypescript'), '../tsc.js')
export const [tscESModuleBuild, tscESModuleWatch] = createTask(
    'esm',
    'Build all TypeScript into browser ES Module',
    (mode) => () =>
        spawn(
            'node',
            [typescriptCLI, '--preserveWatchOutput', '-p', tsconfigESMPath.file, mode === 'development' ? ' -w' : ''],
            {
                stdio: 'inherit',
                cwd: srcPath.relative('../'),
                shell: true,
            },
        ),
)
export const tscSystemBuild = named(
    'system',
    'Build all TypeScript into SystemJS format for Firefox (build)',
    (done: any) => {
        if (buildTarget !== 'firefox') return done()
        return src(output.esmBuildOriginal.js, { since: lastRun(tscSystemBuild) })
            .pipe(modifyFile((x) => toSystem(x).replace('ttsclib.js', 'ttsclib-system.js')))
            .pipe(changed(output.systemBuild.folder))
            .pipe(dest(output.systemBuild.folder))
    },
)
export const tscSystemWatch = named(
    'watch-system',
    'Build all TypeScript into SystemJS format for Firefox (watch)',
    () => watch(output.esmBuildOriginal.folder, { ignoreInitial: false }, tscSystemBuild),
)
export function copyESMOut() {
    return src(output.esmBuildOriginal.js, { since: lastRun(copyESMOut) })
        .pipe(changed(output.esmBuildClone.folder))
        .pipe(dest(output.esmBuildClone.folder))
}
named('copy-esm-out', 'Copy files from tsc output (build)', copyESMOut)
export const watchCopyESMOut = named('watch-copy-esm-out', 'Copy files from tsc output (watch)', () =>
    watch(output.esmBuildOriginal.folder, { ignoreInitial: false }, copyESMOut),
)