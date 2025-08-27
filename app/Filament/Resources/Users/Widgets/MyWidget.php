<?php

namespace App\Filament\Resources\Users\Widgets;

use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class MyWidget extends ChartWidget
{
        protected ?string $heading = 'Croissance des utilisateurs';

    protected ?string $description = 'Nombre de nouveaux utilisateurs par mois sur les 12 derniers mois.';

    protected int | string | array $columnSpan = 'full';

    protected function getData(): array
    {
        // Définit la locale sur français pour la traduction des mois
        Carbon::setLocale('fr');

        $dbDriver = config('database.connections.' . config('database.default') . '.driver');

        $dateFunction = match ($dbDriver) {
            'mysql' => 'DATE_FORMAT(created_at, \'%Y-%m\')',
            'sqlite' => 'strftime(\'%Y-%m\', created_at)',
            default => 'DATE(created_at)' // Fallback générique
        };

        // Récupère le nombre d'utilisateurs groupés par mois pour les 12 derniers mois
        $usersData = User::select(
                DB::raw("$dateFunction as month"),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', Carbon::now()->subYear())
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->pluck('count', 'month');

        $labels = [];
        $data = [];

        // Boucle sur les 12 derniers mois pour s'assurer qu'ils sont tous présents
        for ($i = 11; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthKey = $month->format('Y-m');

            // Ajoute le nom du mois traduit en français (ex: "août 2025")
            $labels[] = ucfirst($month->translatedFormat('M Y'));

            // Ajoute le nombre d'utilisateurs pour le mois, ou 0 si aucun
            $data[] = $usersData->get($monthKey, 0);
        }

        return [
            'datasets' => [
                [
                    'label' => 'Nouveaux utilisateurs',
                    'data' => $data,
                    'backgroundColor' => 'rgba(54, 162, 235, 0.2)',
                    'borderColor' => 'rgba(54, 162, 235, 1)',
                    'borderWidth' => 2,
                    'tension' => 0.3,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
