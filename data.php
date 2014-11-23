<?php

$host = 'localhost';
$user = 'root';
$pwd  = '';
$dbname = 'laravel';

$pdo = new PDO('mysql:host=' . $host . ';dbname='. $dbname, $user, $pwd);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$table = 'posts';

$selection = $pdo->prepare("SELECT * FROM $table");
$selection->execute();

$results = array();

while($result = $selection->fetch(PDO::FETCH_ASSOC)) {
	array_push($results, $result);
}

$results = array_map(function($item) {
	$item['message'] = utf8_encode($item['message']);
	return $item;
}, $results);

$json = json_encode($results);
file_put_contents('data.json', $json);
