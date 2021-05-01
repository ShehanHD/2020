<?php

class Esercizio1Controller
{
    private $Esercizio;

    public function __construct($params, $method, $data)
    {
        $this->Esercizio = new Esercizio1Repository();

        switch ($method) {
            case 'GET':
                $this->Get($params, $data);
                break;
            case 'POST':
                $this->post($params, $data);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function Get($params, $data)
    {
        switch ($params[0]) {
            case 'ciclistiSuEta':
                $this->Esercizio->GetCyclistByAge($params[1]);
                break;
            case 'gareCompreseTra':
                $this->Esercizio->GetRacesByRange($params[1], $params[2]);
                break;
            case 'ciclistiSuGaraPaese':
                $this->Esercizio->GetCyclistByRaceCountry($params[1]);
                break;
            case 'ciclistiSuGaraPaeseOrdinaEta':
                $this->Esercizio->GetCyclistByRaceCountryOrderByAge($params[1]);
                break;
            case 'ciclistiVincitoriSuPaese':
                $this->Esercizio->GetWinningCyclistByCountry($params[1]);
                break;
            case 'mediaDeiGareSuPaesi':
                $this->Esercizio->GetRaceAVGByCountry();
                break;
            case 'gareVintiDeiPaese':
                $this->Esercizio->GetRaceByWinnersCountry($params[1]);
                break;
            case 'ciclistiPiuDiGare':
                $this->Esercizio->participentNumberOfOnCountry($params[1], $params[2]);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function Post($params, $data)
    {
    }
}
