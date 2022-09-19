#!/bin/bash

increment_version()
{
    APP_INFO_FILE="public/plain/info.json"

    if [ ! -f ${APP_INFO_FILE} ]; then
        exit 13
    fi

    PREVIOUS_APP_VERSION=$(cat "${APP_INFO_FILE}" |jq '.app_info.version')

    ## remove quotation marks
    PREVIOUS_APP_VERSION=${PREVIOUS_APP_VERSION//\"/}

    NEW_APP_VERSION=$(bash ./scripts/increment_version/increment_version.sh -p ${PREVIOUS_APP_VERSION})

    echo "New app_version: ${NEW_APP_VERSION}"
    echo "Previous app_version: ${PREVIOUS_APP_VERSION}"

    dot-json "${APP_INFO_FILE}" "app_info.version" "${NEW_APP_VERSION}" --indent=auto

    UPDATED_APP_VERSION=$(cat "${APP_INFO_FILE}" |jq '.app_info.version')

    [ "${PREVIOUS_APP_VERSION}" = "${UPDATED_APP_VERSION}" ] && exit 9 || exit 0
}

git_info()
{
    ## GIT INFO

    git rev-parse --short HEAD >/dev/null 2>&1

    if [ $? -ne 0 ]; then
        exit 12
    fi

    ## Check and install packages dependencies

    ## pnpm global install
    which pnpm >/dev/null 2>&1;

    if [ $? -ne 0 ]; then
        npm install -g pnpm
    fi

    ## dot-json global install
    which dot-json >/dev/null 2>&1;

    if [ $? -ne 0 ]; then
        pnpm add --global dot-json
    fi

    #### GENERATE FILE ####

    local COMMIT_HASH=$(git rev-parse HEAD);
    local COMMIT_HASH_SHORT=$(git rev-parse --short HEAD);
    local BRANCH=$(git branch|grep '*'|awk '{print $2}');

    local GIT_INFO_FILE=./build/plain/git-info.json
    local GIT_REPO=F2-Sistemas/Regional-Business-List-and-News-front-end

    local GIT_INFO_FILE_DIR=$(dirname "${GIT_INFO_FILE}")

    if [ -d "${GIT_INFO_FILE_DIR}" ]; then
        mkdir -p "${GIT_INFO_FILE_DIR}"
    fi

    if [ -f "${GIT_INFO_FILE}" ]; then
        rm "${GIT_INFO_FILE}"
    fi

    echo -e "Generating to '${GIT_INFO_FILE}'\n"

    local GENERATED_AT=$(date +%Y-%m-%d\ %H\:%M\:%S)
    dot-json "${GIT_INFO_FILE}" repo "${GIT_REPO}" --indent=auto
    dot-json "${GIT_INFO_FILE}" branch "${BRANCH}" --indent=auto
    dot-json "${GIT_INFO_FILE}" "commit.hash.id" "${COMMIT_HASH}" --indent=auto
    dot-json "${GIT_INFO_FILE}" "commit.hash.short" "${COMMIT_HASH_SHORT}" --indent=auto
    dot-json "${GIT_INFO_FILE}" file_generated_at "${GENERATED_AT}" --indent=auto

}

get_date()
{
    echo $(date +%Y-%m-%d\ %H\:%M\:%S)
}

increment_version_and_commit()
{
    local OUTPUT="$(bash ./scripts/app-script.sh increment_version)"

    if [ -f "./public/plain/info.json" ]; then
        if [ $? -eq 0 ]; then
            git add "./public/plain/info.json" -f >/dev/null 2>&1;

            if [ $? -eq 0 ]; then
                git commit -m "${OUTPUT}"
                git status
                echo -e "\nLast commit:"
                git log -1
                echo -e "\n"
            fi
        fi
    fi
}

AVAILABLE_FUNCTIONS="increment_version git_info get_date increment_version_and_commit"
SEPRARATOR=" "

for functionName in $@;
do
    which php >/dev/null 2>&1;

    if [ $? -eq 0 ]; then
        php ./scripts/php_scripts/args.php -a="${AVAILABLE_FUNCTIONS}" -t="${functionName}" -s="${SEPRARATOR}" >/dev/null 2>&1;

        if [ $? -eq 0 ]; then
            ${functionName}
        fi
    fi

done
