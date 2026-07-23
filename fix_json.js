const fs = require('fs');

const files = [
  'src/app/ableadmin/projects/page.tsx',
  'src/app/ableadmin/references/page.tsx',
  'src/app/ableadmin/solutions/page.tsx',
  'src/app/ableadmin/stats/page.tsx',
  'src/app/ableadmin/services/page.tsx',
  'src/app/ableadmin/hero/page.tsx',
  'src/app/ableadmin/site-settings/page.tsx',
  'src/app/ableadmin/about/page.tsx',
  'src/app/ableadmin/footer/page.tsx',
  'src/app/ableadmin/contact/page.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the data assignment logic
  content = content.replace(/const data = await res\.json\(\);\n\s+setProjects\((.*?)\);/, 'const result = await res.json();\n        setProjects(result.data || []);');
  content = content.replace(/const data = await res\.json\(\);\n\s+setReferences\((.*?)\);/, 'const result = await res.json();\n        setReferences(result.data || []);');
  content = content.replace(/const data = await res\.json\(\);\n\s+setSolutions\((.*?)\);/, 'const result = await res.json();\n        setSolutions(result.data || []);');
  content = content.replace(/const data = await res\.json\(\);\n\s+setStats\((.*?)\);/, 'const result = await res.json();\n        setStats(result.data || []);');
  content = content.replace(/const data = await res\.json\(\);\n\s+setServices\((.*?)\);/, 'const result = await res.json();\n        setServices(result.data || []);');
  
  content = content.replace(/const data = await res\.json\(\);\n\s+setHero\(prev => \(\{ \.\.\.prev, \.\.\.data \}\)\);/, 'const result = await res.json();\n          if (result.data) setHero(prev => ({ ...prev, ...result.data }));');
  
  content = content.replace(/const data = await res\.json\(\);\n\s+setSettings\(prev => \(\{ \.\.\.prev, \.\.\.data\.settings \}\)\);/, 'const result = await res.json();\n          if (result.data) setSettings(prev => ({ ...prev, ...result.data }));');

  // contact
  content = content.replace(/const data = await res\.json\(\);\n\s+setFormData\({([\s\S]*?)}\);/, (match, p1) => {
    return `const result = await res.json();\n        const data = result.data || {};\n        setFormData({${p1}});`;
  });

  // about, footer
  content = content.replace(/const fetchedData = await res\.json\(\);\n\s+setData\(fetchedData \|\| \{\}\);/g, 'const result = await res.json();\n        setData(result.data || {});');

  fs.writeFileSync(file, content);
}
console.log("Done");
