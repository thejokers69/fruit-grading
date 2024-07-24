<script>
    export let name;
  </script>
  
  <style>
    .svelte-component {
      padding: 1rem;
      background-color: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  </style>
  
  <div class="svelte-component">
    <p>Hello, {name}! This is a Svelte component integrated into React.</p>
  </div>