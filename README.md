## Project Overview: Salzburg Clothing Shops Web Map

This project is an interactive web map that displays clothing shops in Salzburg, Austria. The main goal is to provide a user-friendly tool for finding clothing stores for both residents and tourists, as well as to offer a visual platform for analyzing the retail landscape of the city.

---

### **Target Users**

- **Local Residents:** To find nearby clothing shops, compare offerings, and plan shopping trips.
- **Tourists:** For quick orientation in the city and finding specific types of clothing stores.
- **Business Analysts:** To study the density and distribution of retail outlets and identify potential market opportunities.


---

### **Data Sources**

- **OpenStreetMap (OSM):** The primary source for shop locations and attributes.
- **Overpass API:** Used to query and filter OSM data for relevant categories (e.g., `shop=clothes`).

---

### **Methodology**

- **Data Collection:** Overpass API is used to fetch up-to-date information on clothing shops in Salzburg.
- **Data Processing:** The data is cleaned and structured for mapping (extracting coordinates, names, opening hours, and shop types).
- **Visualization:** Leaflet.js is used to create an interactive map with zoom, search, and filter capabilities.
- **User Interface:** Users can click on shop markers to view details such as name, opening hours, and clothing type.

---

### **Design Choices**

- **Color Scheme:** Bright markers (e.g., orange) are used to make shops stand out on the city map.
- **Usability:** Search bar and filters for shop type and opening hours.
- **Responsiveness:** The interface is optimized for both desktop and mobile devices.
- **Accessibility:** Large fonts and high-contrast elements are used for better readability.

---

### **Analysis and Insights**

- **Distribution:** Most shops are concentrated in the historic city center and near major transport hubs.
- **Diversity:** The map shows a variety of shop types, from boutiques to chain stores and specialty retailers (e.g., sportswear, underwear).
- **Accessibility:** The map helps identify areas with fewer shops, which can be useful for business and urban planning.

---

### **Potential Improvements**

- Add filtering by clothing category (men’s, women’s, children’s, etc.).
- Implement routing from the user’s location to a selected shop.
- Integrate user reviews and ratings.
- Enable automatic data updates from OSM.
- Improve accessibility for users with disabilities.

---

### **Critical Reflection**

- **Strengths:** Using open data and technologies enables rapid development of useful services for a wide range of users.
- **Limitations:** Data accuracy and completeness depend on the OSM community; some information may be missing or outdated.
- **Opportunities:** The project can be expanded to other cities or shop categories and integrated with e-government platforms for municipal support.

---

### **Key Takeaways**

- Web maps based on open data are effective tools for urban analysis and decision-making support.
- Modern GIS technologies make such projects accessible to both users and professionals.
- Regular data updates and user-friendly design are essential for maximizing project value.
