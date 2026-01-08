// package com.dcm.visitor_management.controller;

// import java.time.LocalDate;
// import java.time.YearMonth;
// import java.util.ArrayList;
// import java.util.HashMap;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;

// import com.dcm.visitor_management.repository.VisitorRepository;

// public class DashboardController {

// private final VisitorRepository visitorRepository;
//     private final ReportRepository reportRepository;

//     public DashboardController(VisitorRepository visitorRepository, ReportRepository reportRepository) {
//         this.visitorRepository = visitorRepository;
//         this.reportRepository = reportRepository;
//     }

//     // GET /dashboard/stats
//     @GetMapping("/stats")
//     public ResponseEntity<Map<String, Object>> getStats() {
//         Map<String, Object> stats = new HashMap<>();

//         long totalVisitors = visitorRepository.count();
//         long todayVisitors = visitorRepository.countByVisitDate(LocalDate.now());
//         long totalReports = reportRepository.count();

//         // Example growth rate: compare today vs yesterday
//         long yesterdayVisitors = visitorRepository.countByVisitDate(LocalDate.now().minusDays(1));
//         double growthRate = yesterdayVisitors == 0 ? 0 : ((double)(todayVisitors - yesterdayVisitors) / yesterdayVisitors) * 100;

//         stats.put("totalVisitors", totalVisitors);
//         stats.put("todayVisitors", todayVisitors);
//         stats.put("totalReports", totalReports);
//         stats.put("growthRate", growthRate);

//         return ResponseEntity.ok(stats);
//     }

//     // GET /dashboard/trends?period=monthly or period=daily
//     @GetMapping("/trends")
//     public ResponseEntity<List<Map<String, Object>>> getTrends(@RequestParam String period) {
//         List<Map<String, Object>> trends = new ArrayList<>();

//         if(period.equalsIgnoreCase("monthly")) {
//             // Example: last 6 months
//             for(int i = 5; i >= 0; i--) {
//                 YearMonth ym = YearMonth.now().minusMonths(i);
//                 long count = visitorRepository.countByMonth(ym.getYear(), ym.getMonthValue());
//                 Map<String, Object> data = new HashMap<>();
//                 data.put("month", ym.getMonth().name().substring(0,3));
//                 data.put("visitors", count);
//                 trends.add(data);
//             }
//         } else if(period.equalsIgnoreCase("daily")) {
//             // Example: last 7 days
//             for(int i = 6; i >= 0; i--) {
//                 LocalDate date = LocalDate.now().minusDays(i);
//                 long count = visitorRepository.countByVisitDate(date);
//                 Map<String, Object> data = new HashMap<>();
//                 data.put("day", date.getDayOfWeek().name().substring(0,3));
//                 data.put("count", count);
//                 trends.add(data);
//             }
//         }

//         return ResponseEntity.ok(trends);
//     }

// }
