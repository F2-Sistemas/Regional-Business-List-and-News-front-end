#!/bin/env php

<?php
$options = getopt(
    's:a:t:h:v',
    [
        'separator:',
        'alternatives:',
        'target:',
        'help',
        'verbose',
    ]
);

$optionBool = function (string $key, $defaultValue = false) use ($options): bool {
    if (!$key) {
        return (bool) $defaultValue ?? null;
    }

    $keys = explode('|', $key, 2);
    $key0 = $keys[0] ?? null;
    $key1 = $keys[1] ?? null;

    return (bool) (($options[$key0] ?? $options[$key1] ?? null) === false);
};

$optionString = function (string $key, $defaultValue = null) use ($options): string {
    if (!$key) {
        return (string) $defaultValue ?? null;
    }

    $keys = explode('|', $key, 2);
    $key0 = $keys[0] ?? null;
    $key1 = $keys[1] ?? null;

    $value =  ($options[$key0] ?? $options[$key1] ?? $defaultValue ?? '');
    return $value && is_string($value) ? $value : (string) ($defaultValue ?? null);
};

$optionsSeparator = $optionString('s|separator', '|');
$target = $optionString('t|target');

$alternatives = array_filter(
    explode(
        $optionsSeparator,
        $optionString('a|alternatives')
    ),
    'strlen'
);

$help = $optionBool('h|help', false);
$verbose = $optionBool('v|verbose', false);

try {
    $target = trim(
        in_array($target, $alternatives) ? $target : ''
    );

    if (!$target) {
        throw new \Exception("Error Processing Request", 5);
    }

    echo $target;
    exit(0);
} catch (\Throwable $th) {
    if ($verbose ?? null) {
        throw $th;
    }

    exit($th->getCode());
}
