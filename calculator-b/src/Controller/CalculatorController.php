<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CalculatorController extends AbstractController
{
    /**
     * @Route("/calculator", name="calculator")
     */
    public function index(Request $request): Response
    {
        $body = json_decode($request->getContent());

        $tmpArray = $body->value;
        $tmpArrayTwo = [];
        $tmpValue = null;

        foreach ($tmpArray as $key => $value) {
            if ($value == "*") {

                $tmp = $tmpArray[$key - 1] * $tmpArray[$key + 1];
                if (array_key_exists($key + 2, $tmpArray)) {
                    if ($tmpArray[$key + 2] == "/" || $tmpArray[$key + 2] == "*") {
                        $tmpArray[$key + 1] = $tmp;
                        continue;
                    }
                }
                array_push($tmpArrayTwo, $tmp);
            }
            if ($value == "/") {
                $tmp = $tmpArray[$key - 1] / $tmpArray[$key + 1];
                if (array_key_exists($key + 2, $tmpArray)) {
                    if ($tmpArray[$key + 2] == "/" || $tmpArray[$key + 2] == "*") {
                        $tmpArray[$key + 1] = $tmp;
                        continue;
                    }
                }
                array_push($tmpArrayTwo, $tmp);
            }
            if ($value == "+") {
                if ($key == 1) {
                    array_push($tmpArrayTwo, $tmpArray[$key - 1]);
                }
                array_push($tmpArrayTwo, $value);
                if (array_key_exists($key + 2, $tmpArray)) {
                    if ($tmpArray[$key + 2] == "+" || $tmpArray[$key + 2] == "-") {
                        array_push($tmpArrayTwo, $tmpArray[$key + 1]);
                    }
                }
                if ($key == count($tmpArray) - 2) {
                    array_push($tmpArrayTwo, $tmpArray[$key + 1]);
                }
            }
            if ($value == "-") {
                if ($key == 1) {
                    array_push($tmpArrayTwo, $tmpArray[$key - 1]);
                }
                array_push($tmpArrayTwo, $value);
                if (array_key_exists($key + 2, $tmpArray)) {
                    if ($tmpArray[$key + 2] == "+" || $tmpArray[$key + 2] == "-") {
                        array_push($tmpArrayTwo, $tmpArray[$key + 1]);
                    }
                }
                if ($key == count($tmpArray) - 2) {
                    array_push($tmpArrayTwo, $tmpArray[$key + 1]);
                }
            }
        }

        if (count($tmpArrayTwo) == 1) {
            return $this->json($tmpArrayTwo[0], 200, []);
        }

        foreach ($tmpArrayTwo as $key => $value) {
            if ($value == "+") {
                if ($tmpValue == null) {
                    $tmpValue = $tmpArrayTwo[$key - 1] + $tmpArrayTwo[$key + 1];
                } else {
                    $tmpValue = $tmpValue + $tmpArrayTwo[$key + 1];
                }
            }

            if ($value == "-") {
                if ($tmpValue == null) {
                    $tmpValue = $tmpArrayTwo[$key - 1] - $tmpArrayTwo[$key + 1];
                } else {
                    $tmpValue = $tmpValue - $tmpArrayTwo[$key + 1];
                }
            }
        }
        return $this->json($tmpValue, 200, []);
    }
}
